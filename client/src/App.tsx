import './App.css';
import Dashboard from './component/Dashboard';
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/SignUp';
function App() {
  return (
    <>
     <Router>
       <Routes>
         <Route path="/" element={<Dashboard />} />
         <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       </Routes>
     </Router>
    </>
  );
}

export default App;
