import type React from "react";
import { useRef, useState } from "react";
import { Stack, Typography, Grid, Button } from "@mui/material";
import type { OrderDialogRef } from "../CreateOrder/OrderDialog";
import { useTheme } from "@mui/material/styles";
import { usePizzaContext } from "../../context/PizzaContext";
import ViewOrderDialog from "./ViewOrderDialog";
import type { DoneUserOrder } from "../../types/pizzaTypes";

const ManagmentSection: React.FC = () => {
  const mainTitle = "Managment Section";
  const theme = useTheme();
  const [orderInView, setOrderInView] = useState<DoneUserOrder | undefined>()

  const dialogRef = useRef<OrderDialogRef>(null);
  const { state } = usePizzaContext();
  const handleOpen = () => {
    dialogRef.current?.open();
  };

  return (
    <Stack marginLeft={5} marginTop={5} spacing={2}>
      <Typography variant="h4">{mainTitle}</Typography>
      <Typography variant="h6">Pending orders:</Typography>
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
        {state.pendingOrders.length ? (
          <>
            {state.pendingOrders.map(({ id, name, pizzas }, index) => (
              <Grid
                key={index}
                alignItems="center"
                bgcolor={theme.palette.secondary.main}
                container
              >
                <Grid size={7}>
                  <Typography variant="body1">
                    <strong>Client Name:</strong> {name}
                  </Typography>
                </Grid>
                <Grid size={3}>
                  <Typography variant="body1">
                    <strong>Pizzas count: </strong> {pizzas.length}
                  </Typography>
                </Grid>
                <Grid size={2}>
                  <Button onClick={() => {
                    handleOpen()
                    setOrderInView({id, name, pizzas})
                  }}>View</Button>
                </Grid>
              </Grid>
            ))}
          </>
        ) : (
          <Typography>No pending orders.</Typography>
        )}
      </Stack>
     <ViewOrderDialog ref={dialogRef} orderInView={orderInView} />
    </Stack>
  );
};

export default ManagmentSection;
