export type Extras = {
  cheese: boolean;
  olive: boolean;
  mushrooms: boolean;
  basil: boolean;
  tomato: boolean;
  pineapple: boolean;
};


export type PizaSizes = "S" | "M" | "L";

export type PizzaDetails = {
  size: PizaSizes;
  extras: Extras;
  id: string | undefined;
};
export type UserOrder = {
  name: string;
  pizzas: PizzaDetails[];
};

export type UserOrderManagment = {
  name: string;
  pizzas: PizzaDetails[];
  id:string
};

export type PizzaContextState = {
  pendingOrders: (UserOrder & { id: string })[];
  approvedOrders: (UserOrder & { id: string })[];
};

export type PizzaAction =
  | { type: "ADD_ORDER"; payload: UserOrder }
  | { type: "APPROVE_ORDER"; payload: string };

export const availablePizzaSizes = { S: "Small", M: "Medium", L: "Large" };

export const defaultExtras: Extras = {
  cheese: true,
  olive: false,
  mushrooms: false,
  basil: false,
  tomato: false,
  pineapple: false,
};