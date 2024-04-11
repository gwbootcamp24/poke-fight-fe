import React, { useEffect } from "react";
import { useBackgroundImage } from "../context/BackgroundImageContext.jsx";
import { Outlet } from "react-router-dom";


function PageLayout() {

  const { backgroundImage } = useBackgroundImage();

  useEffect(() => {
    // Hier kannst du bei Bedarf weitere Initialisierungen vornehmen
  }, []);

  return (
    <div className="pagelayout" style={{
      minHeight: "100vh",
      width: "100vw",
      height: "100%",
      backgroundImage: `url(${backgroundImage})`,
      // backgroundImage: "url('../background/start.png')",
      // backgroundImage: "url('https://ballonkunst-herzog.de/wp-content/uploads/2022/01/Ballons.png')",
      // backgroundImage: "radial-gradient(circle, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      <Outlet />
    </div>
  );
}

export default PageLayout;

