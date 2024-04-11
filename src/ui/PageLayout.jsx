import { Outlet } from "react-router-dom";

function PageLayout() {
  return (
    <div className="pagelayout">
      <Outlet />
    </div>
  );
}

export default PageLayout;
