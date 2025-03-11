import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Services from "./screens/Services";
import Courses from "./screens/Courses";
import Benefits from "./screens/Benefits";
import Contact from "./screens/Register";
import Register from "./screens/Register"; // Nueva pantalla de registro
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/beneficios" element={<Benefits />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/registro" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


