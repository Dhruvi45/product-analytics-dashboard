import { format } from "date-fns";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ data }: any) => {
  const [zoom, setZoom] = useState({ start: 0, end: data.length });
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    if (zoomLevel < data.length) {
      setZoomLevel(zoomLevel + 1);
      setZoom({ start: zoom.start, end: zoom.end - 1 });
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 1);
      setZoom({ start: zoom.start, end: zoom.end + 1 });
    }
  };

  const handlePanLeft = () => {
    if (zoom.start > 0) {
      setZoom({ start: zoom.start - 1, end: zoom.end - 1 });
    }
  };

  const handlePanRight = () => {
    if (zoom.end < data.length) {
      setZoom({ start: zoom.start + 1, end: zoom.end + 1 });
    }
  };

  const zoomedData = data.slice(zoom.start, zoom.end);

  // Format the date as "MMM dd" (e.g., "Oct 07")
  const formatXAxis = (tickItem: string) => {
    return format(new Date(tickItem), "dd-MM-yyyy");
  };

  // Format the label on hover
  const formatTooltipLabel = (label: string) => {
    return format(new Date(label), 'dd-MM-yyyy');
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          <Button onClick={handleZoomIn}>Zoom In</Button>
        </Col>
        <Col>
          <Button onClick={handleZoomOut}>Zoom Out</Button>
        </Col>
        <Col>
          <Button onClick={handlePanLeft}>Pan Left</Button>
        </Col>
        <Col>
          <Button onClick={handlePanRight}>Pan Right</Button>
        </Col>
      </Row>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={zoomedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Day" tickFormatter={formatXAxis} />
          <YAxis />
          <Tooltip labelFormatter={formatTooltipLabel}/>
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartComponent;
