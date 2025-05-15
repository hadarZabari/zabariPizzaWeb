export type Extras = {
  cheese: boolean;
  olive: boolean;
  mushrooms: boolean;
  basil: boolean;
  tomato: boolean;
  pineapple: boolean;
};

export const defaultExtras: Extras = {
  cheese: true,
  olive: false,
  mushrooms: false,
  basil: false,
  tomato: false,
  pineapple: false,
};

export const availablePizzaSizes = { S: "Small", M: "Medium", L: "Large" };
