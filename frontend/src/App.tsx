import type React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import OrderSection from "./components/CreateOrder/OrderSection";
import ManagmentSection from "./components/Management/ManagmentSection";
import ROUTES from "./constants/routes";
import { PizzaProvider } from "./context/PizzaProvider";
import Layout from "./Layout";

const App: React.FC = () => {
  return (
    <PizzaProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={ROUTES.CREATE_ORDER} element={<OrderSection />} />
            <Route path={ROUTES.MANAGMENT} element={<ManagmentSection />} />
            <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
          </Route>
        </Routes>
      </Router>
    </PizzaProvider>
  );
};

export default App;
