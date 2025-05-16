import type React from "react";
import "./Home.css";
import pizzaImg from "../../assets/pizza.png";
import ROUTES from "../../constants/routes";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const mainTitle: string = "ZABARI’S PIZZA";
  const bodyContent: string =
    " We are committed to the best pizza. 100% cheese. Build your pizza by adding a variety of toppings.";

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={25}
      height="100%"
    >
      <Grid size={5}>
        <Stack spacing={5}>
          <Stack>
            <Typography variant="h2">{mainTitle}</Typography>
            <Typography variant="body1">{bodyContent}</Typography>
          </Stack>
          <Stack direction="row" gap={2}>
            <Button onClick={() => navigate(ROUTES.CREATE_ORDER)}>
              Create An Order
            </Button>
            <Button onClick={() => navigate(ROUTES.MANAGMENT)}>
              Managment Section
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid>
        <img src={pizzaImg} alt="Pizza" className="pizza-image" />
      </Grid>
    </Grid>
  );
};

export default Home;
