import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

interface FiltersProps {
  filters: { age: string; gender: string };
  setFilters: React.Dispatch<React.SetStateAction<{ age: string; gender: string }>>;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const handleAgeChange = (value: string) => {
    setFilters(prev => ({ ...prev, age: value }));
  };

  const handleGenderChange = (value: string) => {
    setFilters(prev => ({ ...prev, gender: value }));
  };

  return (
    <Form>
      <Row>
        <Col lg={6} md={6}>
          <Form.Group controlId="ageSelect">
            <Form.Label>Age Group</Form.Label>
            <Form.Control as="select" onChange={(e) => handleAgeChange(e.target.value)} value={filters.age}>
              <option value="">Select Age</option>
              <option value="15-25">15-25</option>
              <option value=">25">25</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col lg={6} md={6}>
          <Form.Group controlId="genderSelect">
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" onChange={(e) => handleGenderChange(e.target.value)} value={filters.gender}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
