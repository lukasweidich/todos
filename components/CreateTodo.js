import React, { useState } from "react";
import { createTodo } from "../actions/todoActions";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";

const CreateTodo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [done, setDone] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const handleCreateTodo = ({ e, title, body, done }) => {
    e.preventDefault();
    dispatch(createTodo({ title, body, done, token }));
    router.reload();
  };

  return (
    <Form onSubmit={(e) => handleCreateTodo({ e, title, body, done })}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="title"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Body</Form.Label>
        <Form.Control
          type="body"
          placeholder="Enter Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          label="Done"
          value={done}
          onChange={() => setDone(!done)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Todo
      </Button>
    </Form>
  );
};

export default CreateTodo;
