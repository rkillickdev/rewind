import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useOptions } from "../../contexts/OptionsContext";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const options = useOptions();
  const { genres, eras, categories } = options;

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    image: "",
    genre_preference: "",
    era_preference: "",
    category_preference: "",
  });
  const {
    name,
    bio,
    image,
    genre_preference,
    era_preference,
    category_preference,
  } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const {
            name,
            bio,
            image,
            genre_preference,
            era_preference,
            category_preference,
          } = data;
          setProfileData({
            name,
            bio,
            image,
            genre_preference,
            era_preference,
            category_preference,
          });
        } catch (err) {
          // console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  // Test code for adding genre prefs to an array

  // const [genrePrefs, setGenrePrefs] = useState([]);

  // const handleCheckbox = (e) => {
  //   // setisChecked(e.target.checked);
  //   if (e.target.checked === true) {
  //     // setGenrePrefs([...genrePrefs, e.target.value]);
  //     setProfileData({
  //       ...profileData,
  //       [e.target.name]: [e.target.value],
  //     });
  //   } else if (e.target.checked === false) {
  //     let freshArray = genrePrefs.filter((val) => val !== e.target.value);
  //     setGenrePrefs([...freshArray]);
  //   }
  // };

  // const handleCheckbox = (e) => {
  //   // setisChecked(e.target.checked);
  //   if (e.target.checked === true) {
  // setProfileData({
  //   ...profileData,
  //   [e.target.name]: e.target.value,
  // });
  //   } else if (e.target.checked === false) {
  //     let freshArray = profileData[e.target.name].filter(
  //       (val) => val !== e.target.value,
  //     );
  //     setProfileData({
  //       ...profileData,
  //       [e.target.name]: freshArray,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   console.log(profileData);
  // }, [profileData]);

  // const handleCheck = (event) => {
  //   if (e.target.checked === true) {
  //     setProfileData({
  //       ...profileData,
  //       [event.target.name]: event.target.value,
  //     });
  //   }

  //   console.log(profileData);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("genre_preference", genre_preference);
    formData.append("era_preference", era_preference);
    formData.append("category_preference", category_preference);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
        genre_preference: data.genre_preference,
        era_preference: data.era_preference,
        category_preference: data.category_preference,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          value={bio}
          onChange={handleChange}
          name="bio"
          rows={7}
          placeholder="Tell us about yourself"
        />
      </Form.Group>

      {errors?.bio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </>
  );

  const selectFields = (
    <>
      <Form.Group>
        <Form.Label className="d-none">Genre</Form.Label>
        <Form.Control
          as="select"
          name="genre_preference"
          onChange={handleChange}
          value={genre_preference}
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
          name="era_preference"
          onChange={handleChange}
          value={era_preference}
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
          name="category_preference"
          onChange={handleChange}
          value={category_preference}
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
    </>
  );

  const buttons = (
    <>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container className={appStyles.Content}>
            <Form.Group>
              {image && (
                <figure>
                  <Image src={image} fluid />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">
              {textFields}
              {selectFields}
              {buttons}
            </div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Content}>
            {textFields}
            {selectFields}
            {buttons}
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;
