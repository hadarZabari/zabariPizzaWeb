import { createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#d32f2f",
    },
    secondary: {
      main: "#FFEDCF",
    },
  },
  typography: {
    fontFamily: "Rubik, Arial, sans-serif",
    h2: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontSize: "1rem",
          textTransform: "none",
          "&:focus": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
