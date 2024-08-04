import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import DateRangeSelector from './DateRangeSelector';
import Filters from './Filters';
import { dummyData } from '../dummyData';
import LineChartComponent from '../charts/LineChart';
import BarChartComponent from '../charts/Barchart';
export default function Dashboard() {
  const [data, setData] = useState<any[]>(dummyData);
  const [filters, setFilters] = useState<{ age: string; gender: string }>({ age: '', gender: '' });
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [lineData, setLineData] = useState([]);

  const processLineData = (data: any, feature: any) => {
    return data.map((item: any) => ({ Day: item.Day, value: item[feature] }));
  };

  const handleBarClick = (data: any) => {
    const feature = data.name;
    const processedData = processLineData(dummyData, feature);
    setSelectedFeature(feature);
    setLineData(processedData);
  };

  const clearPreferences = () => {
    // Cookies.remove('filters');
    // Cookies.remove('dateRange');
    setFilters({ age: '', gender: '' });
    setDateRange({ startDate: null, endDate: null });
  };
  const filterData = () => {
    const { startDate, endDate } = dateRange;
    const { age, gender } = filters;

    return dummyData.filter((item: any) => {
      const itemDate = new Date(item.Day);
      const isWithinDateRange = (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
      const matchesAge = !age || item.Age === age;
      const matchesGender = !gender || item.Gender === gender;

      return isWithinDateRange && matchesAge && matchesGender;
    });
  };

  useEffect(() => {
    // setData(filterData());
    console.log(data)
  }, [filters, dateRange]);

  return (
    <>
      <div style={{ padding: '20px' }}>
        <h1>Interactive Data Visualization Dashboard</h1>

        <Container fluid>
          <Row className="align-items-center">
            <Col lg={4} md={4}>
              <Filters filters={filters} setFilters={setFilters} />
            </Col>
            <Col lg={5} md={5}>
              <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
            </Col>
            <Col lg={3} md={3} className="d-flex justify-content-end">
              <Button variant="primary" onClick={() => clearPreferences()}>
                Remove filter
              </Button>
            </Col>
          </Row>
        </Container>

        <div style={{ marginBottom: '40px' }}>
          <BarChartComponent onClick={handleBarClick} data={data} />
        </div>
        <div style={{ marginBottom: '40px' }}>
          {selectedFeature && <LineChartComponent data={lineData} />}
        </div>
      </div>

    </>
  )
}