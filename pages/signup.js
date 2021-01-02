import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";

const signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSignUp = async ({ e, email, password, confirmPassword }) => {
    if (password === confirmPassword) {
      e.preventDefault();
      await axios.post(`/api/users`, {
        user: {
          firstName,
          lastName,
          email,
          password,
        },
      });
      router.push("/login");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <Form
      onSubmit={(e) => handleSignUp({ e, password, email, confirmPassword })}
    >
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>
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
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password again"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Account
      </Button>{" "}
      or log into an existing account{" "}
      <Link href="/login">
        <a>here</a>
      </Link>
      .
    </Form>
  );
};

export default signup;
