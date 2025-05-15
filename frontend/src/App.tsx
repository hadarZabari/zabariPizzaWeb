import type React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import OrderSection from "./components/OrderSection";
import ROUTES from "./routes";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.CREATE_ORDER} element={<OrderSection />} />
        <Route path={ROUTES.MANAGMENT} element={<Home />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME}/>} />
      </Routes>
    </Router>
  );
};

export default App;
