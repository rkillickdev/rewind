import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/CommentCreateEditForm.module.css";

import { axiosRes } from "../../api/axiosDefaults";
import useAlert from "../../hooks/useAlert";

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;
  const [formContent, setFormContent] = useState(content);
  const [errors, setErrors] = useState({});
  const { setAlert } = useAlert();

  // Function to handle changes to form inputs
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setAlert("You updated your comment", "success");
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        {/* Text area for user to update their comment */}
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          aria-label="Update your comment"
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <div className="text-right">
        {/* Button cancels comment update */}
        <button
          className={`${btnStyles.Button} ${btnStyles.Highlight}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        {/* Button to save changes to comment */}
        <button
          className={`${btnStyles.Button} ${btnStyles.Feature}`}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
        {errors.non_field_errors?.map((message, idx) => (
          <Alert variant="warning" key={idx} className="mt-3">
            {message}
          </Alert>
        ))}
      </div>
    </Form>
  );
}

export default CommentEditForm;
