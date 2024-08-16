import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import DateRangeSelector from './DateRangeSelector';
import Filters from './Filters';
// import { dummyData } from '../dummyData';
import LineChartComponent from '../charts/LineChart';
import BarChartComponent from '../charts/Barchart';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState<any[]>([]);
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

  const handleBarClick = (bar: any) => {
    const feature = bar.name;
    const processedData = processLineData(data, feature);
    setSelectedFeature(feature);
    setLineData(processedData);
  };

  const clearPreferences = () => {
    // Cookies.remove('filters');
    // Cookies.remove('dateRange');
    setFilters({ age: '', gender: '' });
    setDateRange({ startDate: null, endDate: null });
  };

  useEffect(() => {
    // setData(filterData());
    console.log('call')
    const params = {
      age: filters.age.length > 0 ? filters.age : null,
      gender: filters.gender.length > 0 ? filters.gender : null,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate
    }
    console.log(params)
    axios.get('https://literate-chainsaw-wqjpp94pp62g96g-5000.app.github.dev/data', { params: params })
      .then((res) => {
        setData(res.data)
        const processedData = processLineData(res.data, selectedFeature);
        setLineData(processedData);

      })
  }, [filters, dateRange]);

  return (
    <>
      <div style={{ padding: '20px' }}>
        <h1>Interactive Data Visualization Dashboard</h1>
<button onClick={()=>navigate('/login')}> login</button>
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
          {selectedFeature && 
          <>
          <h3>Line chart for {selectedFeature}</h3>
          <LineChartComponent data={lineData} />
          </>
          }
        </div>
      </div>

    </>
  )
}