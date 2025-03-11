import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Courses from "./screens/Courses";
// import Contact from "./screens/Register";
import Register from "./screens/Register";
import SignIn from "./screens/SignIn";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Courses" element={<Courses />} />
          {/* <Route path="/Contact" element={<Contact />} /> */}
          <Route path="/Register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


