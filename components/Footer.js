import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ExternalLink from "./ExternalLink";
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            &copy; {new Date().getFullYear()}{" "}
            <ExternalLink href="https://github.com/lukasweidich/todos" withIcon>
              lukasweidich
            </ExternalLink>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
