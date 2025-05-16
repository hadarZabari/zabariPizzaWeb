export type Extras = {
  cheese: boolean;
  olive: boolean;
  mushrooms: boolean;
  basil: boolean;
  tomato: boolean;
  pineapple: boolean;
};

export type PizaSizes = "S" | "M" | "L";

export type PizzaSettings = {
  size: PizaSizes;
  extras: Extras;
  id: string | undefined;
};

export type UserOrder = {
  name: string;
  pizzas: PizzaSettings[];
};

export type DoneUserOrder = {
  name: string;
  pizzas: PizzaSettings[];
  id:string
};



