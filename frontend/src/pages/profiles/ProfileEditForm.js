import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { useOptions } from "../../contexts/OptionsContext";
import useAlert from "../../hooks/useAlert";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();
  const { setAlert } = useAlert();

  // Retrieve options with useOptions custom hook
  const options = useOptions();

  // destructure options
  const { genres, eras, categories } = options;

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    image: "",
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

  // Retrieve and set profile data on component mount
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
          setAlert("sorry, something went wrong.  Try again later.", "warning");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
    // Dependency array determines changes that should trigger handleMount function.
  }, [currentUser, history, id]);

  // Function to handle changes to form inputs
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);

    if (era_preference) {
      formData.append("era_preference", era_preference);
    }

    if (genre_preference) {
      formData.append("genre_preference", genre_preference);
    }

    if (category_preference) {
      formData.append("category_preference", category_preference);
    }

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setAlert("You updated your profile", "success");
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
        <Form.Label className="d-none">Bio</Form.Label>
        <Form.Control
          as="textarea"
          value={bio}
          onChange={handleChange}
          name="bio"
          aria-label="Update your bio"
          rows={7}
          placeholder="Write something about yourself..."
        />
      </Form.Group>

      {errors?.bio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </>
  );

  // destructured options mapped over to provide select fields
  const selectFields = (
    <>
      <Form.Group>
        <Form.Label className="d-none">Genre</Form.Label>
        <Form.Control
          as="select"
          name="genre_preference"
          aria-label="Set your genre preference"
          onChange={handleChange}
          value={genre_preference ? genre_preference : -1}
        >
          <option value={-1} disabled>
            select genre
          </option>
          {genres.map((genre) => {
            return (
              <option value={genre.id} key={genre.id}>
                {genre.style}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      {errors?.genre_preference?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label className="d-none">Era</Form.Label>
        <Form.Control
          as="select"
          name="era_preference"
          aria-label="Set your era preference"
          onChange={handleChange}
          value={era_preference ? era_preference : -1}
        >
          <option value={-1} disabled>
            select era
          </option>
          {eras.map((era) => {
            return (
              <option value={era.id} key={era.id}>
                {era.decade}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      {errors?.era_preference?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label className="d-none">Category</Form.Label>
        <Form.Control
          as="select"
          name="category_preference"
          aria-label="Set your category preference"
          onChange={handleChange}
          value={category_preference ? category_preference : -1}
        >
          <option value={-1} disabled>
            select category
          </option>
          {categories.map((category) => {
            return (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      {errors?.category_preference?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </>
  );

  const buttons = (
    <>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Highlight}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Feature}`}
        type="submit"
      >
        save
      </Button>
      {errors.non_field_errors?.map((message, idx) => (
        <Alert variant="warning" key={idx} className="mt-3">
          {message}
        </Alert>
      ))}
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container className={appStyles.Content}>
            {/* Display current profile image and select new image */}
            <Form.Group>
              {image && (
                <figure>
                  <Image src={image} alt="Current profile picture" fluid />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Feature} btn my-auto`}
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
              {/* User can update their Bio */}
              {textFields}
              <p className={`h4 ${appStyles.FeatureHeading}`}>
                What would you like to hear about?
              </p>
              {/* User can update their preferences */}
              {selectFields}
              {buttons}
            </div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Content}>
            {/* User can update their Bio */}
            {textFields}
            <p className={`h4 ${appStyles.FeatureHeading}`}>
              What would you like to hear about?
            </p>
            {/* User can update their preferences */}
            {selectFields}
            {buttons}
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;
