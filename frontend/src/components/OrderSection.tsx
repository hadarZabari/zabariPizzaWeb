import type React from "react";
import { useRef, useState } from "react";
import { availablePizzaSizes } from "./types";
import {
  Stack,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { Extras } from "./types";
import type { OrderPizzaDialogRef } from "./OrderPizzaDialog";
import { useTheme } from "@mui/material/styles";
import OrderPizzaDialog from "./OrderPizzaDialog";
import { v4 as uuidv4 } from "uuid";
export type PizzaDetails = {
    size: keyof typeof availablePizzaSizes;
    extras: Extras;
    id: string;
  }
type UserOrder = {
  name: string;
  pizzas: PizzaDetails[];
};

const OrderSection: React.FC = () => {
  const mainTitle = "Create Order";
  const theme = useTheme();
  const [userOrder, setUserOrder] = useState<UserOrder>({
    name: "",
    pizzas: [],
  });
  const [pizzaOnEdit, setPizzaOnEdit] = useState<PizzaDetails | null>(null)
  const dialogRef = useRef<OrderPizzaDialogRef>(null);

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const value = e.target.value;
    setUserOrder((prev) => ({ ...prev, name: value }));
  };

  const handleOpen = () => {
    dialogRef.current?.open();
  };

  const handleSave = (
    newSize: keyof typeof availablePizzaSizes,
    newExtras: Extras,
    id?: string
  ) => {
    if (id) {
     
      const updated = userOrder.pizzas.map(({ id: existId, extras, size }) =>
        existId === id
          ? { id, extras: newExtras, size: newSize }
          : { id, extras, size }
      );
 
      setUserOrder((prev) => ({ ...prev, pizzas: updated }));
    } else {
      setUserOrder((prev) => ({
        ...prev,
        pizzas: [
          ...prev.pizzas,
          { extras: newExtras, size: newSize, id: uuidv4() },
        ],
      }));
    }
  };

  return (
    <Stack marginLeft={5} marginTop={5} spacing={2}>
      <Typography variant="h4">{mainTitle}</Typography>
      <TextField
        label="Client Name"
        variant="standard"
        onBlur={(e) => handleBlur(e)}
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
      {userOrder.pizzas.length ? (
        <Stack spacing={2}>
          {userOrder.pizzas.map(({ extras, id, size }, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={4}
              alignItems="center"
              bgcolor={theme.palette.secondary.main}
            >
              <Typography variant="body1">
                <strong>Size:</strong> {size}
              </Typography>
              <Typography variant="body1">
                <strong>Extras:</strong>{" "}
                {Object.keys(extras)
                  .filter((key) => extras[key as keyof Extras])
                  .join(", ")}
              </Typography>
              <Button onClick={() => {
                setPizzaOnEdit({id, extras, size})
                handleOpen()
              }}>Edit</Button>
            </Stack>
          ))}
        </Stack>
      ) : (
        <Typography>No pizza selected.</Typography>
      )}

      <OrderPizzaDialog ref={dialogRef} onSave={handleSave} pizzaOnEdit={pizzaOnEdit}/>
    </Stack>
  );
};

export default OrderSection;
