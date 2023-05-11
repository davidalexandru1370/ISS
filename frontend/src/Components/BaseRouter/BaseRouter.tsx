import { Outlet } from "react-router-dom";
import { NavigationBar } from "../NavigationBar/NavigationBar";

const BaseRouter = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default BaseRouter;
