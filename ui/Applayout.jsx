import { Outlet } from "react-router-dom";
import Header from "../src/components/Header";

function Applayout() {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
}

export default Applayout;
