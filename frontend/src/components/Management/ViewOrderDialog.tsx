import { useState, useImperativeHandle, forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { usePizzaContext } from "../../context/PizzaContext";
import type { DoneUserOrder, Extras } from "../../types/pizzaTypes";

export type ViewOrderDialogRef = {
  open: () => void;
  close: () => void;
};

type ViewOrderDialogProps = {
  orderInView: DoneUserOrder;
};

const ViewOrderDialog = forwardRef<ViewOrderDialogRef, ViewOrderDialogProps>(
  ({ orderInView }, ref) => {
    const [open, setOpen] = useState(false);
    const { dispatch } = usePizzaContext();

    const theme = useTheme();
    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    const handleSave = () => {
      dispatch({ type: "APPROVE_ORDER", payload: orderInView.id });
      setOpen(false);
    };

    const handleCancel = () => {
      setOpen(false);
    };
    return (
      <Dialog open={open} disableEscapeKeyDown fullWidth>
        <DialogTitle>{orderInView.name} Order</DialogTitle>
        <DialogContent>
          <Stack spacing={2} height={400}>
            {orderInView.pizzas.map(({ extras, size }, idx) => (
              <Stack bgcolor={theme.palette.secondary.main} key={idx}>
                <Typography>
                  <strong>size: </strong> {size}
                </Typography>
                <Typography variant="body1">
                  <strong>Extras: </strong>
                  {Object.keys(extras)
                    .filter((key) => extras[key as keyof Extras])
                    .join(", ")}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Exit</Button>
          <Button onClick={handleSave} variant="contained">
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default ViewOrderDialog;
