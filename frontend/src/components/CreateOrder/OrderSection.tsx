import type React from "react";
import { useRef, useState } from "react";
import { Stack, Typography, TextField, Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { PizzaDetails, UserOrder } from "../../types/pizzaTypes";
import type { OrderDialogRef } from "./OrderDialog";
import { useTheme } from "@mui/material/styles";
import OrderDialog from "./OrderDialog";
import { v4 as uuidv4 } from "uuid";
import { usePizzaContext } from "../../context/PizzaContext";
import { defaultExtras } from "../../types/pizzaTypes";
import OrderItems from "./OrderItems";
import CreateOrderActions from "./CreateOrderActions";

const OrderSection: React.FC = () => {
  const mainTitle = "Create Order";
  const theme = useTheme();
  const { dispatch } = usePizzaContext();
  const dialogRef = useRef<OrderDialogRef>(null);
  const [userOrder, setUserOrder] = useState<UserOrder>({
    name: "",
    pizzas: [],
  });
  const [pizzaOnEdit, setPizzaOnEdit] = useState<PizzaDetails>({
    extras: defaultExtras,
    id: undefined,
    size: "M",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserOrder((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleOpen = () => {
    dialogRef.current?.open();
  };

  const handleResetOrder = () => {
    setUserOrder({
      name: "",
      pizzas: [],
    });
  };

  const handleSave = () => {
    if (pizzaOnEdit.id) {
      const updated = userOrder.pizzas.map(({ id, extras, size }) =>
        id === pizzaOnEdit.id
          ? {
              id: pizzaOnEdit.id,
              extras: pizzaOnEdit.extras,
              size: pizzaOnEdit.size,
            }
          : { id, extras, size }
      );
      setUserOrder((prev) => ({ ...prev, pizzas: updated }));
    } else {
      setUserOrder((prev) => ({
        ...prev,
        pizzas: [
          ...prev.pizzas,
          { extras: pizzaOnEdit.extras, size: pizzaOnEdit.size, id: uuidv4() },
        ],
      }));
    }
  };

  const handleSendOrder = () => {
    dispatch({ type: "ADD_ORDER", payload: { ...userOrder, id: uuidv4() } });
    handleResetOrder();
  };

  return (
    <Stack marginLeft={5} marginTop={5} spacing={2}>
      <Typography variant="h4">{mainTitle}</Typography>
      <TextField
        label="Client Name"
        variant="standard"
        value={userOrder.name}
        onChange={(e) => handleChange(e)}
      />
      <Grid container alignItems="center">
        <Grid size={5}>
          <Typography borderBottom={1}>My Order: </Typography>
        </Grid>
        <Grid>
          <IconButton onClick={handleOpen}>
            <AddIcon sx={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Grid>
      </Grid>
      <OrderItems
        handleOpen={handleOpen}
        setPizzaOnEdit={setPizzaOnEdit}
        userPizzas={userOrder.pizzas}
      />
      <CreateOrderActions
        handleSend={handleSendOrder}
        handleReset={handleResetOrder}
        sendBtnDisabeld={
          !userOrder.pizzas.length || userOrder.name.trim() === ""
        }
        resetBtnDisabeld={
          !userOrder.pizzas.length && userOrder.name.trim() === ""
        }
      />
      <OrderDialog
        ref={dialogRef}
        onSave={handleSave}
        pizzaOnEdit={pizzaOnEdit}
        setPizzaOnEdit={setPizzaOnEdit}
      />
    </Stack>
  );
};

export default OrderSection;
