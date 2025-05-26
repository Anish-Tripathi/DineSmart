import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Layout({ children }) {
  useEffect(() => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      );
    }

    document.body.classList.add("layout-active");

    document.body.style.zoom = 1;

    return () => {
      document.body.classList.remove("layout-active");
      document.body.style.zoom = "";
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <div className="content-container">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
