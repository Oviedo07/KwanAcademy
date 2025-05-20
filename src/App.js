import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from './context/AdminAuthContext';
import { UserAuthProvider } from './context/UserAuthContext';

// ─── Pantallas y componentes ───────────────────────────────────────────────────
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./screens/Home";
import Courses from "./screens/Courses";
import Register from "./screens/Register";
import Data from "./screens/Data";
import SignIn from "./screens/SignIn";

import HomeAdmin from "./screens/AdminViews/HomeAdmin";
import LoginAdmin from "./screens/AdminViews/LoginAdmin";
import AdminDashboard from "./screens/AdminViews/AdminDashboard";
import ProtectedRouteAdmin from "./screens/AdminViews/components/ProtectedRouteAdmin";

import FormCourse from "./screens/FormCourse";
import MissionVission from "./screens/MissionVission";
import WhoWeAre from "./screens/WhoWeAre";
import FreeResources from "./screens/FreeResources";
import FAQ from "./screens/FAQ";

import PanelInstructor from "./screens/PanelInstructor";            // 🆕
import PanelUser from "./screens/PanelUser";                        // 🆕 (existe en tu árbol)
import Error404 from "./screens/Error404";

// ───────────────────────────────────────────────────────────────────────────────
function AppWrapper() {
  const { pathname } = useLocation();

  // Rutas donde SÍ se debe ocultar el layout
  const hideLayout = ![
    "/", "/SignIn", "/Courses", "/Register", "/Data",
    "/AdminViews/HomeAdmin", "/AdminViews/LoginAdmin", "/AdminViews/AdminDashboard",
    "/FormCourse", "/MissionVission", "/WhoWeAre", "/FreeResources",
    "/FAQ", "/PanelInstructor", "/PanelUser"                          // 🆕
  ].includes(pathname);

  return (
    <div className="App">
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Data" element={<Data />} />
        <Route path="/FormCourse" element={<FormCourse />} />
        <Route path="/MissionVission" element={<MissionVission />} />
        <Route path="/WhoWeAre" element={<WhoWeAre />} />
        <Route path="/FreeResources" element={<FreeResources />} />
        <Route path="/FAQ" element={<FAQ />} />

        {/* Paneles de usuario/instructor */}
        <Route path="/PanelInstructor" element={<PanelInstructor />} />  {/* 🆕 */}
        <Route path="/PanelUser" element={<PanelUser />} />              {/* 🆕 */}

        {/* Área de administración */}
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

        {/* 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
}

// ─── Providers de contexto y PayPal ────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <UserAuthProvider>
          <PayPalScriptProvider options={{ "client-id": "AZf85qCRU8WgeVrHc1nTkbNyLRG3sSCoRhOCgqk6bdt2JEp4un6szFguqN8Bx9ew6iBeGgcgRm78k1EZ" }}>
            <Router>
              <AppWrapper />
            </Router>
          </PayPalScriptProvider>
        </UserAuthProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
}
