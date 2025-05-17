import { useNavigate, useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ROUTES from "./constants/routes";

const GlobalHomeButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  return (
    <IconButton color="primary" onClick={() => navigate(ROUTES.HOME)}>
      <HomeIcon />
    </IconButton>
  );
};

export default GlobalHomeButton;
