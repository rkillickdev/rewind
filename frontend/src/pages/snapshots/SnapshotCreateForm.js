import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/image-upload-icon.png";

import styles from "../../styles/SnapshotCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

function SnapshotCreateForm() {
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);

  const fetchOptions = async () => {
    try {
      const { data } = await axiosRes.get("/genres/");
      // data.map((item) => console.log(item.style));
      const results = [];
      console.log(data);
      setOptions(data.results);
      // data.forEach((value) => {
      //   results.push(value.style);
      //   console.log(results);
      // });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  console.log(options);

  const [snapshotData, setSnaphotData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const { title, description, image } = snapshotData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setSnaphotData({
      ...snapshotData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setSnaphotData({
        ...snapshotData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/snapshots/", formData);
      history.push(`/snapshots/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label className="d-none">Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Give your snapshot a title..."
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="d-none">Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="description"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" name="category" onChange={handleChange}>
          {Object.keys(options).map((keyName) => {
            return (
              <option value={keyName} key={`category-${keyName}`}>
                {options[keyName].style}
              </option>
              // console.log(keyName)
            );
          })}
        </Form.Control>
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change Image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click here to upload your image"
                  />
                </Form.Label>
              )}
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default SnapshotCreateForm;
