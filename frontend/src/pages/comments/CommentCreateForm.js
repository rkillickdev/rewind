import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

import { axiosRes } from "../../api/axiosDefaults";
import useAlert from "../../hooks/useAlert";
import Avatar from "../../components/Avatar";

function CommentCreateForm(props) {
  const { snapshot, setSnapshot, setComments, profileImage, profile_id } =
    props;
  const [content, setContent] = useState("");
  const { setAlert } = useAlert();
  const [errors, setErrors] = useState({});

  // Function to handle changes to form inputs
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        snapshot,
      });
      setAlert("You added a comment", "success");
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setSnapshot((prevSnapshot) => ({
        results: [
          {
            ...prevSnapshot.results[0],
            comments_count: prevSnapshot.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          {/* Link to profile of user leaving comment */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          {/* Text area for user to leave their comment */}
          <Form.Control
            className={styles.Form}
            placeholder="leave a comment..."
            as="textarea"
            name="content"
            aria-label="Enter a comment"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Comment submission button */}
      <button
        className={`${btnStyles.Button} ${btnStyles.Feature} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
      {errors.non_field_errors?.map((message, idx) => (
        <Alert variant="warning" key={idx} className="mt-3">
          {message}
        </Alert>
      ))}
    </Form>
  );
}

export default CommentCreateForm;
