import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Row, Col } from 'react-bootstrap';

interface DateRangeSelectorProps {
  dateRange: { startDate: Date | null; endDate: Date | null };
  setDateRange: React.Dispatch<React.SetStateAction<{ startDate: Date | null; endDate: Date | null }>>;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ dateRange, setDateRange }) => {
  const handleStartChange = (date: Date | null) => {
    setDateRange(prev => ({ ...prev, startDate: date }));
  };

  const handleEndChange = (date: Date | null) => {
    setDateRange(prev => ({ ...prev, endDate: date }));
  };

  return (
    <Form>
      <Row>
        <Col lg={6} md={6}>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <DatePicker
              placeholderText="Start Date"
              isClearable={true}
              clearButtonTitle="Clear"
              selected={dateRange.startDate}
              onChange={handleStartChange}
              className="form-control"
            />
          </Form.Group>
        </Col>
        <Col lg={6} md={6}>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <DatePicker
              placeholderText="End Date"
              isClearable={true}
              clearButtonTitle="Clear"
              selected={dateRange.endDate}
              onChange={handleEndChange}
              className="form-control"
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default DateRangeSelector;
