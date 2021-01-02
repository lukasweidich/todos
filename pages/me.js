import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withAuthentication } from "../auth/requirePageAuth";
import { logOut } from "../actions/authActions";
import { useRouter } from "next/router";

export const getServerSideProps = withAuthentication(async ({ token }) => {
  return {
    props: {},
  };
});

const me = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token } = useSelector((state) => state.auth);
  const { firstName, lastName, email, id } = user ?? {
    firstName: "",
    lastName: "",
    email: "",
    id: "",
  };

  const [firstNameUseState, setFirstNameUseState] = useState(firstName);
  const [lastNameUseState, setLastNameUseState] = useState(lastName);
  const [emailUseState, setEmailUseState] = useState(email);

  const updateInformationHandler = async (e) => {
    e.preventDefault();
    await axios.put(
      `/api/users/${id}`,
      {
        user: {
          firstName: firstNameUseState,
          lastName: lastNameUseState,
          email: emailUseState,
        },
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    router.reload();
  };

  const deleteAccountHandler = async () => {
    await axios.delete(`/api/users/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(logOut());
    router.reload();
  };

  return (
    <>
      {user && (
        <>
          <h2>Hello {firstName}, let's get things done!</h2>
          <Form onSubmit={updateInformationHandler}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstNameUseState}
                onChange={(e) => setFirstNameUseState(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastNameUseState}
                onChange={(e) => setLastNameUseState(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter E-Mail"
                value={emailUseState}
                onChange={(e) => setEmailUseState(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update information
            </Button>{" "}
            <Button variant="secondary" onClick={deleteAccountHandler}>
              Delete Account
            </Button>
          </Form>
        </>
      )}
    </>
  );
};

export default me;
