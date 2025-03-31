import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Courses from "./screens/Courses";
// import Contact from "./screens/Register";
import Register from "./screens/Register";
import SignIn from "./screens/SignIn";
import HomeAdmin from "./screens/AdminViews/HomeAdmin";
import LoginAdmin  from "./screens/AdminViews/LoginAdmin";
import Navbar from "./Components/navBar";
import Footer from "./Components/Footer";
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
            <Route path="/AdminViews/HomeAdmin" element={<HomeAdmin/>} />
            <Route path="/AdminViews/LoginAdmin" element={<LoginAdmin/>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


