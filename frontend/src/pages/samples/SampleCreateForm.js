import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Upload from "../../assets/sound-waves.png";

import { axiosReq } from "../../api/axiosDefaults";
import useAlert from "../../hooks/useAlert";

const SampleCreateForm = (props) => {
  const { snapshot, setSnapshot, setSamples, total_samples } = props;
  const [audio, setAudio] = useState("");
  const { setAlert } = useAlert();
  const [errors, setErrors] = useState({});
  const [sampleLimitError, setSampleLimitError] = useState();
  const audioInput = useRef(null);

  // Function to handle changes to form input field
  const handleChangeAudio = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(audio);
      setAudio(URL.createObjectURL(event.target.files[0]));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client side validation to check sample count
    if (total_samples >= 3) {
      setSampleLimitError(
        "Sorry, the maximum number of samples have been added for this snapshot",
      );
      return;
    }

    const formData = new FormData();
    formData.append("snapshot", snapshot);
    formData.append("audio", audioInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/samples/", formData);
      setAlert(
        "You added a sample.  This is awaiting approval by our team.",
        "success",
      );
      setSamples((prevSamples) => ({
        ...prevSamples,
        results: [data, ...prevSamples.results],
      }));
      setSnapshot((prevSnapshot) => ({
        results: [
          {
            ...prevSnapshot.results[0],
            samples_count: prevSnapshot.results[0].samples_count + 1,
            total_samples: prevSnapshot.results[0].total_samples + 1,
          },
        ],
      }));
      setAudio("");
    } catch (err) {
      // console.log(err)
      setErrors(err.response?.data);

      // Only set alert if error not related to audio field
      if (!err.response?.data.audio) {
        setAlert("sorry, something went wrong.  Try again later.", "warning");
      }
    }
  };

  return (
    <Form
      className="mt-2 mb-4 d-flex justify-content-between"
      onSubmit={handleSubmit}
    >
      {/* User selects file to upload */}
      <Form.Group className="text-center my-auto">
        {audio ? (
          <>
            <i className="fa-solid fa-file-audio"></i>
            <div>
              <Form.Label
                className={`${btnStyles.Button} ${btnStyles.Feature} btn`}
                htmlFor="audio-upload"
              >
                Change File
              </Form.Label>
            </div>
          </>
        ) : (
          <Form.Label
            className="d-flex justify-content-center align-items-center my-0 p-2"
            htmlFor="audio-upload"
          >
            <img
              src={Upload}
              alt="upload a sample"
              height={45}
              width={45}
              className={appStyles.ImageIconClickable}
            />
            <p className={`${appStyles.FeatureHeading} mb-0 px-3 h4`}>
              Click here to add a sample
            </p>
          </Form.Label>
        )}
        <Form.File
          id="audio-upload"
          accept="audio/*"
          onChange={handleChangeAudio}
          ref={audioInput}
        />
      </Form.Group>
      {sampleLimitError && <Alert variant="warning">{sampleLimitError}</Alert>}
      {errors?.audio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Feature}`}
        type="submit"
      >
        Upload
      </Button>
    </Form>
  );
};

export default SampleCreateForm;
