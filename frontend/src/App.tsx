import type React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import OrderSection from "./components/OrderSection";
import ManagmentSection from "./components/ManagmentSection";
import ROUTES from "./routes";
import { PizzaProvider } from "./context/PizzaContext";

const App: React.FC = () => {
  return (
    <PizzaProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.CREATE_ORDER} element={<OrderSection />} />
          <Route path={ROUTES.MANAGMENT} element={<ManagmentSection />} />
          <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
        </Routes>
      </Router>
    </PizzaProvider>
  );
};

export default App;
