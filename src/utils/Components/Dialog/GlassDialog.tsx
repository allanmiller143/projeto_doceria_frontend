// GlassDialog.tsx
import React from "react";
import { Dialog, type DialogProps } from "@mui/material";

type GlassDialogProps = DialogProps & {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function GlassDialog({ open, onClose, children, ...props }: GlassDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={(_event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        onClose();
      }}
      maxWidth="sm"
      disableEscapeKeyDown
      fullWidth
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.1)",
          backdropFilter: "blur(2px)",
        },
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          width: { xs: '90%', sm: '600px' }, // 90% da tela no celular, 500px no desktop
          maxWidth: '100%',
          py: { xs: 2, sm: 3 },
          px: { xs: 0, sm: 3 },
          borderRadius: { xs: 2, sm: 4 },
          mx: 'auto',
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(16px) saturate(100%)",
          WebkitBackdropFilter: "blur(16px) saturate(100%)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
        },
      }}
      {...props}
    >
      {children}
    </Dialog>
  );
}
