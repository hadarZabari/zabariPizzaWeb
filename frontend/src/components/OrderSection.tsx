import type React from "react";
import { useRef, useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  type Extras,
  type PizaSizes,
  type PizzaDetails,
  type UserOrder,
} from "../types/pizzaTypes";
import type { OrderPizzaDialogRef } from "./OrderPizzaDialog";
import { useTheme } from "@mui/material/styles";
import OrderPizzaDialog from "./OrderPizzaDialog";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes";
import { usePizzaContext } from "../context/PizzaContext";
const OrderSection: React.FC = () => {
  const mainTitle = "Create Order";
  const theme = useTheme();
  const navigate = useNavigate();
  const {  dispatch } = usePizzaContext();

  const [userOrder, setUserOrder] = useState<UserOrder>({
    name: "",
    pizzas: [],
  });
  const [pizzaOnEdit, setPizzaOnEdit] = useState<PizzaDetails | null>(null);
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

  const handleSave = (newSize: PizaSizes, newExtras: Extras, id?: string) => {
    if (id) {
      const updated = userOrder.pizzas.map(({ id: existId, extras, size }) =>
        existId === id
          ? { id, extras: newExtras, size: newSize }
          : { id: existId, extras, size }
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

  const handleSendOrder = () => {
    dispatch({ type: "ADD_ORDER", payload: { ...userOrder, id: uuidv4() } });
    setUserOrder({
      name: "",
      pizzas: [],
    });
  };

  return (
    <Stack marginLeft={5} marginTop={5} spacing={2}>
      <Typography variant="h4">{mainTitle}</Typography>
      <Button onClick={() => navigate(ROUTES.HOME)}>Home</Button>
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
      <Stack
        spacing={2}
        width={600}
        height={350}
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          p: 2,
        }}
      >
        {userOrder.pizzas.length ? (
          <>
            {userOrder.pizzas.map(({ extras, id, size }, index) => (
              <Grid
                key={index}
                alignItems="center"
                bgcolor={theme.palette.secondary.main}
                container
              >
                <Grid size={3}>
                  <Typography variant="body1">
                    <strong>Size:</strong> {size}
                  </Typography>
                </Grid>
                <Grid size={7}>
                  <Typography variant="body1">
                    <strong>Extras:</strong>
                    {Object.keys(extras)
                      .filter((key) => extras[key as keyof Extras])
                      .join(", ")}
                  </Typography>
                </Grid>
                <Grid size={2}>
                  <Button
                    onClick={() => {
                      setPizzaOnEdit({ id, extras, size });
                      handleOpen();
                    }}
                  >
                    Edit
                  </Button>
                </Grid>
              </Grid>
            ))}
          </>
        ) : (
          <Typography>No pizza selected.</Typography>
        )}
      </Stack>
      <Grid container>
        <Grid size={3}>
          <Button
            variant="contained"
            onClick={handleSendOrder}
            disabled={!userOrder.pizzas.length || userOrder.name.trim() === ""}
          >
            Send Order
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            disabled={!userOrder.pizzas.length || userOrder.name.trim() === ""}
          >
            Delete Order
          </Button>
        </Grid>
      </Grid>
      <OrderPizzaDialog
        ref={dialogRef}
        onSave={handleSave}
        pizzaOnEdit={pizzaOnEdit}
      />
    </Stack>
  );
};

export default OrderSection;
