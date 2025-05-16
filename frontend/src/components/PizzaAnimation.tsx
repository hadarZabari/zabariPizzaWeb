import type React from "react";
import { motion } from "framer-motion";
import BasePizza from "../assets/PizzaBase.png";
import type { Extras } from "../types/PizzaTypes";
import Basil from "../assets/Basil.png";
import Mushroom from "../assets/Mushroom.png";
import Olive from "../assets/Olive.png";
import Pineapple from "../assets/Pineapple.png";
import Tomato from "../assets/Tomato.png";
import BaseCheese from "../assets/BaseCheese.png";

type ToppingName = keyof Extras;
type PizzaAnimationProps = {
  extras: Extras;
};

const PizzaAnimation: React.FC<PizzaAnimationProps> = ({ extras }) => {
  const toppingImages: Record<ToppingName, string> = {
    cheese: BaseCheese,
    olive: Olive,
    mushrooms: Mushroom,
    basil: Basil,
    tomato: Tomato,
    pineapple: Pineapple,
  };
  return (
    <div style={{ position: "relative", width: 250, height: 250 }}>
      <img
        src={BasePizza}
        alt="Pizza Base"
        style={{ width: "100%", height: "100%" }}
      />
      {Object.entries(extras).map(([key, isSelected]) =>
        isSelected ? (
          <motion.img
            key={key}
            src={toppingImages[key as keyof Extras]}
            alt={key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : null
      )}
    </div>
  );
};

export default PizzaAnimation;
