import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./screens/Home";
import Courses from "./screens/Courses";
import Register from "./screens/Register";
import Data from "./screens/Data";
import SignIn from "./screens/SignIn";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./screens/AdminViews/AdminDashboard";
import FreeResources from "./screens/FreeResources";
import FAQ from "./screens/FAQ";
import HomeAdmin from "./screens/AdminViews/HomeAdmin";
import LoginAdmin  from "./screens/AdminViews/LoginAdmin";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRouteAdmin from "./screens/AdminViews/components/ProtectedRouteAdmin"; // ajusta la ruta si está en otra carpeta
import MissionVission from "./screens/MissionVission";
import WhoWeAre from "./screens/WhoWeAre";
import FormularioCurso from "./screens/FormularioCurso";

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
            <Route path="/Register" element={<Register />} />
            <Route path="/Data" element={<Data />} />
            <Route path="/AdminViews/HomeAdmin" element={<HomeAdmin/>} />
            <Route path="/AdminViews/LoginAdmin" element={<LoginAdmin/>} />
            <Route path="/AdminViews/AdminDashboard" element={<ProtectedRouteAdmin><AdminDashboard />
            </ProtectedRouteAdmin>} />
            <Route path="/FormularioCurso" element={<FormularioCurso/>} />
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


