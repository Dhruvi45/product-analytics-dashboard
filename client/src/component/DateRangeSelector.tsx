import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface DateRangeSelectorProps {
  dateRange: { startDate: Date | null; endDate: Date | null };
  setDateRange: React.Dispatch<React.SetStateAction<{ startDate: Date | null; endDate: Date | null }>>;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ dateRange, setDateRange }) => {
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setDateRange(prev => ({ ...prev, startDate: date }));
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setDateRange(prev => ({ ...prev, endDate: date }));
  };

  const formatDate = (date: Date | null): string => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };

  return (
    <Form>
      <Row>
      <Col lg={6} md={6}>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Start Date"
              value={formatDate(dateRange.startDate)}
              onChange={handleStartChange}
            />
          </Form.Group>
        </Col>
        <Col lg={6} md={6}>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="End Date"
              value={formatDate(dateRange.endDate)}
              onChange={handleEndChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default DateRangeSelector;
