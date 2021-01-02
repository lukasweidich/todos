import React, { useState } from "react";
import { useRouter } from "next/router";
import { logIn } from "../actions/authActions";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";

const login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const urlParams = new URLSearchParams(router.asPath.split("?")[1]);
  const redirect = urlParams.get("redirect") ?? "/";

  const handleLogIn = ({ e, email, password }) => {
    e.preventDefault();
    dispatch(logIn({ email, password }));
    router.push(redirect);
  };

  return (
    <Form onSubmit={(e) => handleLogIn({ e, password, email })}>
      <Form.Group>
        <Form.Label>E-Mail</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Log In
      </Button>{" "}
      or create a new account{" "}
      <Link href="/signup">
        <a>here</a>
      </Link>
      .
    </Form>
  );
};

export default login;
