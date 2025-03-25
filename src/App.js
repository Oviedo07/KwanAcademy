import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Courses from "./screens/Courses";
// import Contact from "./screens/Register";
import Register from "./screens/Register";
import Data from "./screens/Data";
import SignIn from "./screens/SignIn";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Courses" element={<Courses />} />
            {/* <Route path="/Contact" element={<Contact />} /> */}
            <Route path="/Register" element={<Register />} />
            <Route path="/Data" element={<Data />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


