import { createContext, useContext } from "react";
import type { PizzaAction, PizzaState } from "./PizzaReducer";

type PizzaContextType = {
  state: PizzaState;
  dispatch: React.Dispatch<PizzaAction>;
};

const initialState: PizzaState = {
  pendingOrders: [],
  approvedOrders: [],
};

export const getInitialState = (): PizzaState => {
  const stored = localStorage.getItem("pizza-state");
  return stored ? JSON.parse(stored) : initialState;
};

export const PizzaContext = createContext<PizzaContextType>({
  state: getInitialState(),
  dispatch: () => null,
});

export const usePizzaContext = () => {
  const context = useContext(PizzaContext);
  if (!context) {
    throw new Error("provider is missing");
  }
  return context;
};
