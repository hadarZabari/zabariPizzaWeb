import type React from "react";
import { Stack, Typography, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { PizzaDetails, Extras } from "../../types/pizzaTypes";

type OrderItemsProps = {
  userPizzas: PizzaDetails[];
  setPizzaOnEdit: React.Dispatch<React.SetStateAction<PizzaDetails>>;
  handleOpen: () => void;
};

const OrderItems: React.FC<OrderItemsProps> = ({
  userPizzas,
  setPizzaOnEdit,
  handleOpen,
}) => {
  const theme = useTheme();
  return (
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
      {userPizzas.length ? (
        <>
          {userPizzas.map(({ extras, id, size }, index) => (
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
  );
};

export default OrderItems;
