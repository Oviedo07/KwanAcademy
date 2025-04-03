import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Screens/Home";
import Courses from "./Screens/Courses";
// import Contact from "./screens/Register";
import Register from "./screens/Register";
import Data from "./screens/Data";
import SignIn from "./screens/SignIn";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./Screens/AdminViews/AdminDashboard";
import FreeResources from "./screens/FreeResources";
import FAQ from "./screens/FAQ";
import HomeAdmin from "./Screens/AdminViews/HomeAdmin";
import LoginAdmin  from "./Screens/AdminViews/LoginAdmin";
import { AuthProvider } from "./context/AuthContext";
import MissionVission from "./screens/MissionVission";
import WhoWeAre from "./screens/WhoWeAre";

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
            <Route path="/AdminViews/AdminDashboard" element={<AdminDashboard/>}/>
            <Route path="/MissionVission" element={<MissionVission />} />
            <Route path="/WhoWeAre" element={<WhoWeAre />} />
            <Route path="/FreeResources" element={<FreeResources />} />
            <Route path="/FAQ" element={<FAQ />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


