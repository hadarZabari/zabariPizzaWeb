import React, { createContext, useReducer, useContext, useEffect } from "react";
import type { Extras, UserOrderManagment } from "../types/pizzaTypes";

type State = {
  pendingOrders: UserOrderManagment[];
  approvedOrders: UserOrderManagment[];
};

type Action =
  | { type: "ADD_ORDER"; payload: UserOrderManagment }
  | { type: "APPROVE_ORDER"; payload: string };

type PizzaContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
  defaultExtras: Extras;
};

const initialState: State = {
  pendingOrders: [],
  approvedOrders: [],
};
const defaultExtras: Extras = {
  cheese: true,
  olive: false,
  mushrooms: false,
  basil: false,
  tomato: false,
  pineapple: false,
};

const pizzaReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        pendingOrders: [...state.pendingOrders, action.payload],
      };
    case "APPROVE_ORDER": {
      const approvedOrder = state.pendingOrders.find(
        (o) => o.id === action.payload
      );
      if (!approvedOrder) return state;
      return {
        pendingOrders: state.pendingOrders.filter(
          (o) => o.id !== action.payload
        ),
        approvedOrders: [...state.approvedOrders, approvedOrder],
      };
    }
    default:
      return state;
  }
};

const getInitialState = (): State => {
  const stored = localStorage.getItem("pizza-state");
  return stored ? JSON.parse(stored) : initialState;
};

export const PizzaContext = createContext<PizzaContextType>({
  state: getInitialState(),
  dispatch: () => null,
  defaultExtras: defaultExtras,
});

export const PizzaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    pizzaReducer,
    undefined,
    getInitialState
  );

  useEffect(() => {
    localStorage.setItem("pizza-state", JSON.stringify(state));
  }, [state]);

  return (
    <PizzaContext.Provider value={{ state, dispatch, defaultExtras }}>
      {children}
    </PizzaContext.Provider>
  );
};

export const usePizzaContext = () => {
  const context = useContext(PizzaContext);
  if (!context) {
    throw new Error("usePizzaContext must be used within a PizzaProvider");
  }
  return context;
};
