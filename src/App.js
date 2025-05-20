<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from './context/AdminAuthContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // 🆕 PayPal provider

// Importación de pantallas y componentes
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
import LoginAdmin from "./screens/AdminViews/LoginAdmin";
import ProtectedRouteAdmin from "./screens/AdminViews/components/ProtectedRouteAdmin";
import MissionVission from "./screens/MissionVission";
import WhoWeAre from "./screens/WhoWeAre";
import FormularioCurso from "./screens/FormularioCurso";
import Error404 from "./screens/Error404";

function AppWrapper() {
  const location = useLocation();

  const currentPath = location.pathname;
  const hideLayout = ![
    "/", "/SignIn", "/Courses", "/Register", "/Data",
    "/AdminViews/HomeAdmin", "/AdminViews/LoginAdmin", "/AdminViews/AdminDashboard",
    "/FormularioCurso", "/MissionVission", "/WhoWeAre", "/FreeResources", "/FAQ"
  ].includes(currentPath);

  return (
    <div className="App">
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Data" element={<Data />} />
        <Route path="/AdminViews/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/AdminViews/LoginAdmin" element={<LoginAdmin />} />
        <Route
          path="/AdminViews/AdminDashboard"
          element={
            <ProtectedRouteAdmin>
              <AdminDashboard />
            </ProtectedRouteAdmin>
          }
        />
        <Route path="/FormularioCurso" element={<FormularioCurso />} />
        <Route path="/MissionVission" element={<MissionVission />} />
        <Route path="/WhoWeAre" element={<WhoWeAre />} />
        <Route path="/FreeResources" element={<FreeResources />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  );
}
>>>>>>> origin/Pablo07

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <UserAuthProvider>
          <PayPalScriptProvider options={{ "client-id": "AZf85qCRU8WgeVrHc1nTkbNyLRG3sSCoRhOCgqk6bdt2JEp4un6szFguqN8Bx9ew6iBeGgcgRm78k1EZ" }}> {/* 🆕 PayPal wrapper */}
            <Router>
              <AppWrapper />
            </Router>
          </PayPalScriptProvider>
        </UserAuthProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;
