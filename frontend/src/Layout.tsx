import { Outlet } from "react-router-dom";
import GlobalHomeButton from "./GlobalHomeButton";

const Layout: React.FC = () => {
  return (
    <>
      <GlobalHomeButton />
      <Outlet />
    </>
  );
};

export default Layout;
