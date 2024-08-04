import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

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
  return (
    <>
      <div>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
        <button onClick={handlePanLeft}>Pan Left</button>
        <button onClick={handlePanRight}>Pan Right</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={zoomedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartComponent;
