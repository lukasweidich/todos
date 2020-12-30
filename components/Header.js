import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../actions/authActions";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logOut());
    router.push("/");
  };

  return (
    <header>
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>Todos by lukasweidich</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              {user ? (
                <NavDropdown title={user.firstName}>
                  <NavDropdown.Item>
                    <Link href="/me" passHref>
                      <Nav.Link>Account</Nav.Link>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link href="/login" passHref>
                  <Nav.Link>Log In</Nav.Link>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
