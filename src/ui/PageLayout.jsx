import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

function PageLayout() {
  return (
    <div className="min-h-screen bg-green-200 " style={{ "width": "100vw", height: "100%", backgroundImage: "radial-gradient(circle, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)" }}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default PageLayout;
