import React, { useState, useImperativeHandle, forwardRef, useEffect } from "react";
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
import { availablePizzaSizes, defaultExtras, type Extras } from "./types";
import type { PizzaDetails } from "./OrderSection";
export type OrderPizzaDialogRef = {
  open: () => void;
  close: () => void;
};

type OrderPizzaDialogProps = {
    pizzaOnEdit: PizzaDetails | null,
  onSave: (
    newSize: keyof typeof availablePizzaSizes,
    newExtras: Extras,
    id?: string
  ) => void;
};

const OrderPizzaDialog = forwardRef<OrderPizzaDialogRef, OrderPizzaDialogProps>(
  ({ onSave, pizzaOnEdit }, ref) => {
    const [open, setOpen] = useState(false);
    const [pizzaSize, setPizzaSize] =
      useState<keyof typeof availablePizzaSizes>("M");
    const [pizzaExtras, setPizzaExtras] = useState<Extras>(defaultExtras);
    const [idPizza, setIdPizza] = useState<string | undefined>(undefined)
    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    useEffect(() => {
    if(pizzaOnEdit){
     setPizzaSize(pizzaOnEdit?.size)
     setPizzaExtras(pizzaOnEdit.extras)
        setIdPizza(pizzaOnEdit.id)
    }
       
    }, [pizzaOnEdit])
    
    const handleCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setPizzaExtras((prev) => ({
        ...prev,
        [event.target.name]: event.target.checked,
      }));
    };

      const handleSave = () => {
        onSave(pizzaSize, pizzaExtras, idPizza)
        setOpen(false);
        ResetDialog();
      };

    const handleCancel = () => {
      setOpen(false);
      ResetDialog();
    };

    const ResetDialog = () => {
      setPizzaExtras(defaultExtras);
      setPizzaSize("M");
      setIdPizza(undefined)
    };

    return (
      <Dialog open={open} disableEscapeKeyDown fullWidth>
        <DialogTitle>Build your Pizza</DialogTitle>
        <DialogContent>
          <PizzaAnimation extras={pizzaExtras} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Size</InputLabel>
            <Select
              value={pizzaSize}
              onChange={(e) => setPizzaSize(e.target.value)}
            >
              {Object.keys(availablePizzaSizes).map((key) => (
                <MenuItem value={key}>
                  {availablePizzaSizes[key as keyof typeof availablePizzaSizes]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            {Object.keys(pizzaExtras).map((key) => (
              <Grid size={6} key={key}>
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={pizzaExtras[key as keyof Extras]}
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
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default OrderPizzaDialog;
