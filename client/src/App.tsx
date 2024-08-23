import "./App.css";
import Dashboard from "./component/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./component/Auth";
function App() {
  const token = localStorage.getItem("token");
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
