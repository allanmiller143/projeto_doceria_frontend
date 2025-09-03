// src/pages/Home/Index.tsx
import { useState } from "react";
import UseDisconnectContext from "../../Services/DisconnectContext/UseDisconnectContext";
import GlassDialogClose from "../../utils/Components/Dialog/GlassDialogClose";
import {Box,Typography,Button,IconButton } from "@mui/material";
import { WarningAmber, Close } from "@mui/icons-material";

export default function Disconnected() {
  const [open, setOpen] = useState(true);
  const { setDisconnected } = UseDisconnectContext();

  const handleClose = () => {
    setOpen(false);
    setDisconnected(false);
    window.location.href = "/";
  };

  return (
    <GlassDialogClose open={open} onClose={handleClose}>
      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" gap={2} p={3} position="relative">
        {/* Botão X no canto superior direito */}
        <IconButton onClick={handleClose} sx={{ position: "absolute", top: 8, right: 8 }} >
          <Close />
        </IconButton>
        <WarningAmber color="warning" sx={{ fontSize: 60 }} />
        <Typography variant="h5" fontWeight="bold"> Desconectado </Typography>
        <Typography variant="body1" color="text.secondary">Você foi desconectado. Por favor, faça login novamente para continuar.</Typography>
        <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2, borderRadius: 2 }} > Login </Button>
      </Box>
    </GlassDialogClose>
  );
}
