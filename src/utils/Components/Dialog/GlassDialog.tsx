// GlassDialog.tsx
import React from "react";
import { Dialog, type DialogProps } from "@mui/material";

type GlassDialogProps = DialogProps & {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function GlassDialog({open, onClose, children, ...props }: GlassDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={(_event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return; // não fecha
        }
        onClose();
      }}
      maxWidth= "sm"
      disableEscapeKeyDown
      fullWidth
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.1)", // ajusta a "película"
          backdropFilter: "blur(2px)",        // opcional: vidro no fundo também
        },
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          p: 2,
          borderRadius: 4,
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(16px) saturate(100%)",
          WebkitBackdropFilter: "blur(16px) saturate(100%)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
        },
      }}
      {...props}
    >
      {children}
    </Dialog>
  );
}
