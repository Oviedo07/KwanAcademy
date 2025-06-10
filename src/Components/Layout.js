// src/components/Layout.js
import { Outlet } from "react-router-dom";
import Navbar from "./navBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
