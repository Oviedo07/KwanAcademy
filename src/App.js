import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Screens/Home";
import Courses from "./Screens/Courses";
// import Contact from "./screens/Register";
import Register from "./Screens/Register";
import Data from "./Screens/Data";
import SignIn from "./Screens/SignIn";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AdminDashboard from "./Screens/AdminViews/AdminDashboard";
import FreeResources from "./Screens/FreeResources";
import FAQ from "./Screens/FAQ";
import HomeAdmin from "./Screens/AdminViews/HomeAdmin";
import LoginAdmin  from "./Screens/AdminViews/LoginAdmin";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRouteAdmin from "./Screens/AdminViews/components/ProtectedRouteAdmin"; // ajusta la ruta si está en otra carpeta
import MissionVission from "./Screens/MissionVission";
import WhoWeAre from "./Screens/WhoWeAre";

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
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
            <Route path="/AdminViews/AdminDashboard" element={<ProtectedRouteAdmin><AdminDashboard />
            </ProtectedRouteAdmin>} />
            <Route path="/MissionVission" element={<MissionVission />} />
            <Route path="/WhoWeAre" element={<WhoWeAre />} />
            <Route path="/FreeResources" element={<FreeResources />} />
            <Route path="/FAQ" element={<FAQ />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;


