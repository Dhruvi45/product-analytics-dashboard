import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col, Nav } from 'react-bootstrap';
interface SignupFormInputs {
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const { register, handleSubmit } = useForm<SignupFormInputs>();
  const navigate = useNavigate();

  const onSubmit = (data: SignupFormInputs) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login');
  };
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container className="auth-container">
    <Card>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey={isLogin ? 'login' : 'signup'}>
          <Nav.Item>
            <Nav.Link eventKey="login" onClick={() => setIsLogin(true)}>
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="signup" onClick={() => setIsLogin(false)}>
              Sign Up
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        {isLogin ? (
          <LoginForm />
        ) : (
          <SignUpForm />
        )}
      </Card.Body>
    </Card>
  </Container>
);
};

const LoginForm = () => (
<Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Login
  </Button>
</Form>
);

const SignUpForm = () => (
<Form>
  <Form.Group controlId="formBasicName">
    <Form.Label>Full Name</Form.Label>
    <Form.Control type="text" placeholder="Enter your full name" />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>

  <Form.Group controlId="formBasicConfirmPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" placeholder="Confirm Password" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Sign Up
  </Button>
</Form>
);


export default Signup;
