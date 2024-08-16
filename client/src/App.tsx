import './App.css';
import Dashboard from './component/Dashboard';
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import Login from './component/Auth';
function App() {
  return (
    <>
     <Router>
       <Routes>
         <Route path="/" element={<Dashboard />} />
         <Route path="/login" element={<Login />} />
       </Routes>
     </Router>
    </>
  );
}

export default App;
