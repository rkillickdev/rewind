import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/SnapshotCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function SnapshotEditForm() {
  const [errors, setErrors] = useState({});
  const [genres, setGenres] = useState([]);
  const [eras, setEras] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchGenres = async () => {
    try {
      const { data } = await axiosRes.get("/genres/");
      setGenres(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEras = async () => {
    try {
      const { data } = await axiosRes.get("/eras/");
      setEras(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axiosRes.get("/categories/");
      setCategories(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchEras();
    fetchCategories();
  }, []);

  const [snapshotData, setSnapshotData] = useState({
    title: "",
    description: "",
    image: "",
    genre: "",
    era: "",
    category: "",
  });
  const { title, description, image, genre, era, category } = snapshotData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/snapshots/${id}/`);
        const { title, description, image, era, genre, category, is_owner } =
          data;

        is_owner
          ? setSnapshotData({ title, description, image, era, genre, category })
          : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setSnapshotData({
      ...snapshotData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setSnapshotData({
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
    formData.append("era", era);
    formData.append("genre", genre);
    formData.append("category", category);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/snapshots/${id}/`, formData);
      history.push(`/snapshots/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  console.log(genre);

  const textSelectFields = (
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
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

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
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label className="d-none">Genre</Form.Label>
        <Form.Control
          as="select"
          name="genre"
          onChange={handleChange}
          value={genre}
        >
          {genres.map((genre) => {
            return (
              <option value={genre.id} key={genre.id}>
                {genre.style}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      {errors?.genre?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label className="d-none">Era</Form.Label>
        <Form.Control
          as="select"
          name="era"
          onChange={handleChange}
          value={era}
        >
          {eras.map((era) => {
            return (
              <option value={era.id} key={era.id}>
                {era.decade}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      {errors?.era?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label className="d-none">Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          onChange={handleChange}
          value={category}
        >
          {categories.map((category) => {
            return (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Save
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

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textSelectFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>
            {textSelectFields}
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default SnapshotEditForm;
