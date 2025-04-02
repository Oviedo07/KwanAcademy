import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Screens/Home";
import Courses from "./Screens/Courses";
// import Contact from "./screens/Register";
import Register from "./Screens/Register";
import Data from "./Screens/Data";
import SignIn from "./Screens/SignIn";
import HomeAdmin from "./Screens/AdminViews/HomeAdmin";
import LoginAdmin  from "./Screens/AdminViews/LoginAdmin";
import CenterAdmin from "./Screens/AdminViews/CenterAdmin";
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
            <Route path="/Data" element={<Data />} />
            <Route path="/AdminViews/HomeAdmin" element={<HomeAdmin/>} />
            <Route path="/AdminViews/LoginAdmin" element={<LoginAdmin/>} />
            <Route path="/AdminViews/CenterAdmin" element={<CenterAdmin/>}/>
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


