import React, { useEffect } from "react";
import { useBackgroundImage } from "../context/BackgroundImageContext.jsx";
import { Outlet } from "react-router-dom";


function PageLayout() {

  const { backgroundImage } = useBackgroundImage();

  return (
    <div className="pagelayout" style={{
      minHeight: "100vh",
      width: "100vw",
      height: "100%",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      <Outlet />
    </div>
  );
}

export default PageLayout;

