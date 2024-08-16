import './App.css';
import Dashboard from './component/Dashboard';
import { BrowserRouter as Router ,Routes, Route, Navigate } from 'react-router-dom';
import Login from './component/Auth';
function App() {
  return (
    <>
     <Router>
       <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/" element={<Navigate to="/dashboard" />} />
       </Routes>
     </Router>
    </>
  );
}

export default App;
