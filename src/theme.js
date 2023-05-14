import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    contrastThreshold: 4.5,
    mode: "dark",

    primary: {
      main: "#f9b31f",
    },
    secondary: {
      main: "#009bff",
    },

    custom: {
      main: "#9E9E9E",
      text: "#EEEEEE",
    },

    search: {
      main: "#ffffff3b",
      background: "#1E1E1E",
    },
  },
});
