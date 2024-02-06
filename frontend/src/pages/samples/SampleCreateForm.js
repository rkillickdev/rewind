import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import Upload from "../../assets/sound-waves.png";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import useAlert from "../../hooks/useAlert";

const SampleCreateForm = (props) => {
  const { snapshot, setSnapshot, setSamples } = props;
  const [audio, setAudio] = useState("");
  const { setAlert } = useAlert();
  const [errors, setErrors] = useState({});
  const audioInput = useRef(null);

  const handleChangeAudio = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(audio);
      setAudio(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("snapshot", snapshot);
    formData.append("audio", audioInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/samples/", formData);
      setAlert("You added a sample", "success");
      setSamples((prevSamples) => ({
        ...prevSamples,
        results: [data, ...prevSamples.results],
      }));
      setSnapshot((prevSnapshot) => ({
        results: [
          {
            ...prevSnapshot.results[0],
            samples_count: prevSnapshot.results[0].samples_count + 1,
          },
        ],
      }));
      setAudio("");
    } catch (err) {
      // console.log(err);
      // setAlert(err.message, "warning");
      setErrors(err.response?.data);
    }
  };

  return (
    <Form
      className="mt-2 mb-4 d-flex justify-content-between"
      onSubmit={handleSubmit}
    >
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
            <img src={Upload} alt="upload a sample" height={45} width={45} />
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
      {errors.non_field_errors?.map((message, idx) => (
        <Alert variant="warning" key={idx} className="mt-3">
          {message}
        </Alert>
      ))}
    </Form>
  );
};

export default SampleCreateForm;
