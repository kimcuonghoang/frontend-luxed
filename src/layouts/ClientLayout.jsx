import React from "react";

import { Outlet } from "react-router-dom";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const ClientLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />.
      <main>
        {" "}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ClientLayout;
