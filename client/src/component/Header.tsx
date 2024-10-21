import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => {
                navigate("/dashboard");
              }}>MoonShoot</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/outlook");
              }}
            >
              Outlook
            </Nav.Link>
            <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
