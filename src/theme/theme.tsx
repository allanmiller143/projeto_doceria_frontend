// src/theme.ts
import { createTheme } from "@mui/material/styles";

// aqui você personaliza
const theme = createTheme({
  palette: {
    mode: "light", // ou "dark"
    primary: {
      main: "#1976d2", // azul padrão do MUI
    },
    secondary: {
      main: "#9c27b0", // roxo
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: "2rem" },
    h2: { fontWeight: 600, fontSize: "1.5rem" },
  },
  shape: {
    borderRadius: 12, // bordas mais arredondadas
  },
});

export default theme;
