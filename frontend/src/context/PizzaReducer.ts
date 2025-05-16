import type { DoneUserOrder } from "../types/pizzaTypes";

export type PizzaState = {
  pendingOrders: DoneUserOrder[];
  approvedOrders: DoneUserOrder[];
};

export type PizzaAction =
  | { type: "ADD_ORDER"; payload: DoneUserOrder }
  | { type: "APPROVE_ORDER"; payload: string };


export const pizzaReducer = (state: PizzaState, action: PizzaAction): PizzaState => {
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
