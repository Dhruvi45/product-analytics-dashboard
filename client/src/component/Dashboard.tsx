import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import Cookies from "js-cookie";
import DateRangeSelector from "./DateRangeSelector";
import Filters from "./Filters";
import LineChartComponent from "../charts/LineChart";
import BarChartComponent from "../charts/Barchart";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState<{ age: string; gender: string }>(
    Cookies.get("filters")
      ? JSON.parse(Cookies.get("filters") || "")
      : { age: "", gender: "" }
  );
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>(
    Cookies.get("dateRange")
      ? JSON.parse(Cookies.get("dateRange") || "")
      : { startDate: null, endDate: null }
  );
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [lineData, setLineData] = useState([]);
  const [shareableUrl, setShareableUrl] = useState(""); // Define the shareableUrl state

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
    Cookies.remove("filters");
    Cookies.remove("dateRange");
    setFilters({ age: "", gender: "" });
    setDateRange({ startDate: null, endDate: null });
  };

  // Function to generate the shareable URL
  const generateShareableURL = () => {
    const params = new URLSearchParams({
      age: filters.age,
      gender: filters.gender,
      startDate: dateRange.startDate
        ? new Date(dateRange.startDate).toISOString().split("T")[0]
        : "",
      endDate: dateRange.endDate
        ? new Date(dateRange.endDate).toISOString().split("T")[0]
        : "",
    });

    const shareableURL = `${window.location.origin}${
      window.location.pathname
    }?${params.toString()}`;
    setShareableUrl(shareableURL); // Store the generated URL in state
    navigator.clipboard.writeText(shareableURL).then(() => {
      alert("Shareable URL copied to clipboard!");
    });
  };

  const copyToClipboard = () => {
    if (shareableUrl) {
      navigator.clipboard.writeText(shareableUrl);
      alert("URL copied to clipboard!");
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const age = queryParams?.get("age");
    const gender = queryParams?.get("gender");
    const startDate = queryParams?.get("startDate");
    const endDate = queryParams?.get("endDate");
    if (queryParams) {
      setFilters({
        age: age || "",
        gender: gender || "",
      });

      setDateRange({
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      });
    }
    const params = {
      age: filters.age.length > 0 ? (queryParams ? age : filters.age) : null,
      gender:
        filters.gender.length > 0
          ? queryParams
            ? gender
            : filters.gender
          : null,
      startDate: dateRange.startDate
        ? queryParams
          ? startDate
          : new Date(dateRange.startDate).toISOString().split("T")[0]
        : null,
      endDate: dateRange.endDate
        ? queryParams
          ? endDate
          : new Date(dateRange.endDate).toISOString().split("T")[0]
        : null,
    };

    axios
      .get("https://lflv8h-5000.csb.app/data", { params: params })
      .then((res) => {
        setData(res.data);
        if (selectedFeature) {
          const processedData = processLineData(res.data, selectedFeature);
          setLineData(processedData);
        }
      });
  }, [filters, dateRange, selectedFeature]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const age = queryParams.get("age");
    const gender = queryParams.get("gender");
    const startDate = queryParams.get("startDate");
    const endDate = queryParams.get("endDate");

    // Set filters and date range from URL
    setFilters({
      age: age || "",
      gender: gender || "",
    });

    setDateRange({
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    });
  }, [location.search]);

  // Store filters and date range in cookies
  useEffect(() => {
    Cookies.set("filters", JSON.stringify(filters), { expires: 7 });
    Cookies.set("dateRange", JSON.stringify(dateRange), { expires: 7 });
  }, [filters, dateRange]);

  // Load filters and date range from cookies when the page loads
  useEffect(() => {
    const savedFilters = Cookies.get("filters");
    const savedDateRange = Cookies.get("dateRange");

    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }

    if (savedDateRange) {
      const { startDate, endDate } = JSON.parse(savedDateRange);
      setDateRange({
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      });
    }
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <Container fluid>
          <Row className="align-items-center">
            <Col lg={4} md={4}>
              <Filters filters={filters} setFilters={setFilters} />
            </Col>
            <Col lg={5} md={5}>
              <DateRangeSelector
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </Col>
            <Col lg={3} md={3} className="d-flex justify-content-end">
              <Button variant="primary" onClick={clearPreferences}>
                Remove filter
              </Button>
            </Col>
          </Row>
        </Container>

        <div style={{ marginBottom: "40px" }}>
          <BarChartComponent onClick={handleBarClick} data={data} />
        </div>
        <div style={{ marginBottom: "40px" }}>
          {selectedFeature && (
            <>
              <h3>Line chart for {selectedFeature}</h3>
              <LineChartComponent data={lineData} />
            </>
          )}
        </div>

        {/* Shareable URL Section */}
        <div style={{ marginTop: "20px" }}>
          <Button onClick={generateShareableURL}>Generate Shareable URL</Button>
          {shareableUrl && (
            <div style={{ marginTop: "10px" }}>
              <p>Share this URL:</p>
              <input
                type="text"
                value={shareableUrl}
                readOnly
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <Button onClick={copyToClipboard}>Copy URL to Clipboard</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
