import { type Extras } from "../types/pizzaTypes";

export const defaultExtras: Extras = {
  cheese: true,
  olive: false,
  mushrooms: false,
  basil: false,
  tomato: false,
  pineapple: false,
};

export const availablePizzaSizes = { S: "Small", M: "Medium", L: "Large" };
