import "./App.css";
import { useEffect } from "react";
import Dashboard from "./component/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./component/Auth";
import Mail from "./Q2/Mail";
function App() {
  let token = localStorage.getItem("token");
  useEffect(() => {
    let token = localStorage.getItem("token");
  }, [token]);
  console.log(token ? "<Mail />" : '<Navigate to="/login" />');
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/outlook"
            element={token ? <Mail /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={
              token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
