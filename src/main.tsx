import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider, CssBaseline } from "@mui/material";

import theme from   './theme/theme.tsx'
import { Toaster } from "sonner";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        <Toaster richColors position="top-right" /> 
    </ThemeProvider>
  </StrictMode>
)
