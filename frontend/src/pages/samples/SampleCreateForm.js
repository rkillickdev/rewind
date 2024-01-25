import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/image-upload-icon.png";

import styles from "../../styles/SampleCreateForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import Avatar from "../../components/Avatar";
import { axiosReq } from "../../api/axiosDefaults";
import useAlert from "../../hooks/useAlert";

const SampleCreateForm = (props) => {
  const { snapshot, setSnapshot, setSamples, profileImage, profile_id } = props;
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

  console.log(audio);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("snapshot", snapshot);
    formData.append("audio", audioInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/samples/", formData);
      console.log(data);
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
      console.log(err);
      setAlert(err.message, "warning");
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group className="text-center">
        {audio ? (
          <>
            <i className="fa-solid fa-file-audio"></i>
            <div>
              <Form.Label
                className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                htmlFor="audio-upload"
              >
                Change File
              </Form.Label>
            </div>
          </>
        ) : (
          <Form.Label
            className="d-flex justify-content-center"
            htmlFor="audio-upload"
          >
            <Asset src={Upload} message="Click here to upload your file" />
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

      {/* <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button> */}
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Add
      </Button>
    </Form>
  );
};

export default SampleCreateForm;
