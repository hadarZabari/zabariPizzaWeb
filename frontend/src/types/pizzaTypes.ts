export type Extras = {
  cheese: boolean;
  olive: boolean;
  mushrooms: boolean;
  basil: boolean;
  tomato: boolean;
  pineapple: boolean;
};

export type PizaSizes = "S" | "M" | "L";

export type PizzaDefinition = {
  size: PizaSizes;
  extras: Extras;
  id: string | undefined;
};

export type UserOrder = {
  name: string;
  pizzas: PizzaDefinition[];
};

export type DoneUserOrder = {
  name: string;
  pizzas: PizzaDefinition[];
  id:string
};



