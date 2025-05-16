import type React from "react";
import { Grid, Button } from "@mui/material";

type CreateOrderActionsProps = {
  handleSend: () => void;
  handleReset: () => void;
  sendBtnDisabeld: boolean;
  resetBtnDisabeld: boolean;
};
const CreateOrderActions: React.FC<CreateOrderActionsProps> = ({
  handleReset,
  handleSend,
  resetBtnDisabeld,
  sendBtnDisabeld,
}) => {
  return (
    <Grid container>
      <Grid size={3}>
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={sendBtnDisabeld}
        >
          Send Order
        </Button>
      </Grid>
      <Grid>
        <Button
          variant="outlined"
          onClick={handleReset}
          disabled={resetBtnDisabeld}
        >
          Reset Order
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateOrderActions;
