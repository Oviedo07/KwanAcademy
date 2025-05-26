import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from './context/AdminAuthContext';
import { UserAuthProvider } from './context/UserAuthContext';

// ─── Layout ─────────────────────────────────────────────────────
import Layout from "./components/Layout";

// ─── Pantallas y componentes ────────────────────────────────────
import Home from "./screens/Home";
import Courses from "./screens/Courses";
import Register from "./screens/Register";
import Data from "./screens/Data";
import SignIn from "./Screens/SignIn";

import HomeAdmin from "./Screens/AdminViews/HomeAdmin";
import LoginAdmin from "./Screens/AdminViews/LoginAdmin";
import AdminDashboard from "./Screens/AdminViews/AdminDashboard";
import ProtectedRouteAdmin from "./Screens/AdminViews/components/ProtectedRouteAdmin";

import FormCourse from "./Screens/FormCourse";
import MissionVission from "./Screens/MissionVission";
import WhoWeAre from "./Screens/WhoWeAre";
import FreeResources from "./Screens/FreeResources";
import FAQ from "./Screens/FAQ";

import PanelInstructor from "./screens/PanelInstructor";
import PanelUser from "./screens/PanelUser";
import Error404 from "./screens/Error404";

// ─── Rutas ───────────────────────────────────────────────────────
// ─── Rutas ───────────────────────────────────────────────────────
function AppWrapper() {
  return (
    <Routes>
      {/* Rutas CON layout */}
      <Route element={<Layout />}>
    <Routes>
      {/* Rutas CON layout */}
      <Route element={<Layout />}>
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
        <Route path="/PanelInstructor" element={<PanelInstructor />} />
        <Route path="/PanelUser" element={<PanelUser />} />
        <Route path="/AdminViews/HomeAdmin" element={<HomeAdmin />} />
      <Route path="/AdminViews/LoginAdmin" element={<LoginAdmin />} />
      
      </Route>

      {/* Rutas SIN layout */}
      <Route
        path="/AdminViews/AdminDashboard"
        element={
          <ProtectedRouteAdmin>
            <AdminDashboard />
          </ProtectedRouteAdmin>}
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

// ─── App con Providers ───────────────────────────────────────────
// ─── App con Providers ───────────────────────────────────────────
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