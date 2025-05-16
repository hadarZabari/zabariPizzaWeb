import React, { useReducer, useEffect } from "react";
import { pizzaReducer } from "./PizzaReducer";
import { PizzaContext, getInitialState } from "./PizzaContext";

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
    <PizzaContext.Provider value={{ state, dispatch }}>
      {children}
    </PizzaContext.Provider>
  );
};
