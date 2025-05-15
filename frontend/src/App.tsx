import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
// import CreateOrder from "./components/CreateOrder";
import ROUTES from "./routes";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.CREATE_ORDER} element={<Home />} />
        <Route path={ROUTES.MANAGMENT} element={<Home />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME}/>} />
      </Routes>
    </Router>
  );
};

export default App;
