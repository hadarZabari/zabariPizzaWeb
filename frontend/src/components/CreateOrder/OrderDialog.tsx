import React, {
  useState,
  useImperativeHandle,
  forwardRef
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import PizzaAnimation from "./PizzaAnimation";
import {
  availablePizzaSizes,
  defaultExtras,
  type Extras,
  type PizaSizes,
  type PizzaDetails,
} from "../../types/pizzaTypes";

export type OrderDialogRef = {
  open: () => void;
  close: () => void;
};

type OrderDialogProps = {
  onSave: () => void;
  setPizzaOnEdit: React.Dispatch<React.SetStateAction<PizzaDetails>>
  pizzaOnEdit: PizzaDetails;
  
};

const OrderDialog = forwardRef<OrderDialogRef, OrderDialogProps>(
  ({ onSave, pizzaOnEdit, setPizzaOnEdit }, ref) => {

    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));


    const handleCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setPizzaOnEdit((prev) => ({
        ...prev,
        extras: { ...prev.extras, [event.target.name]: event.target.checked },
      }));
    };

    const handleSave = () => {
      onSave();
      setOpen(false);
      ResetDialog();
    };

    const handleCancel = () => {
      setOpen(false);
      ResetDialog();
    };

    const ResetDialog = () => {
      setPizzaOnEdit({
        extras: defaultExtras,
        id: undefined,
        size: "M",
      });
    };

    return (
      <Dialog open={open} disableEscapeKeyDown fullWidth>
        <DialogTitle>Build your Pizza</DialogTitle>
        <DialogContent>
          <PizzaAnimation extras={pizzaOnEdit.extras} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Size</InputLabel>
            <Select
              value={pizzaOnEdit.size}
              onChange={(e) =>
                setPizzaOnEdit((prev) => ({
                  ...prev,
                  size: e.target.value,
                }))
              }
            >
              {Object.keys(availablePizzaSizes).map((key) => (
                <MenuItem value={key}>
                  {availablePizzaSizes[key as PizaSizes]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            {Object.keys(pizzaOnEdit.extras).map((key) => (
              <Grid size={6} key={key}>
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={pizzaOnEdit.extras[key as keyof Extras]}
                      onChange={handleCheckboxChange}
                      name={key}
                    />
                  }
                  label={key}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default OrderDialog;
