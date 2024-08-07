import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import '../css/auth.css'
interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: any) => user.email === data.email && user.password === data.password);

    navigate('/');
    localStorage.setItem('currentUser', JSON.stringify(user));
    // if (user) {
    // } else {
    //   alert('Invalid email or password');
    // }
  };

  return (
    <Container className="custom-container">
      <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Col xs={12}>
          <Card className="custom-card">
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className='mb-3'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" {...register('email', { required: true })} />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" {...register('password', { required: true })} />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Login</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
