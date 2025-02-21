import './App.css';
import WellcomePage from './pages/WellcomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<WellcomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
