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
    router.reload();
  };

  return (
    <>
      <header>
        <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <Link href="/" passHref>
              <Navbar.Brand>Todos</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="navbar">
              <Nav className="ml-auto">
                {user ? (
                  <NavDropdown title={user.firstName ?? ""} id="dropdown">
                    <NavDropdown.Item>
                      <Link href="/me" passHref>
                        Account
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <Link href="" passHref>
                        Logout
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <>
                    <Link href="/signup" passHref>
                      <Nav.Link>Create Account</Nav.Link>
                    </Link>
                    <Link href="/login" passHref>
                      <Nav.Link>Log In</Nav.Link>
                    </Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <hr className="my-2" />
    </>
  );
};

export default Header;
