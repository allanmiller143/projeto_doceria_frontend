import { useMemo, useState } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UseForgetContext from "../Context/UseForgetContext";
import PasswordInput from "../../../../utils/Components/textfields/PasswordInput";

type Step3Props = {
  title: string;
  onClose?: () => void;
};

function isStrong(pw: string) {
  if (!pw) return false;
  const hasLen = pw.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(pw);
  const hasNumber = /\d/.test(pw);
  return hasLen && hasLetter && hasNumber;
}

export default function Step3({ title, onClose }: Step3Props) {
  // se precisar do email aqui, você pode ler do contexto:
  // const { email } = UseForgetContext();
  const {newPassword,setNewPassword, confirm, setConfirm } = UseForgetContext();

  const strong = useMemo(() => isStrong(newPassword), [newPassword]);
  const match = useMemo(() => confirm === newPassword && confirm.length > 0, [confirm, newPassword]);

  return (
    <Box component="form" noValidate>
      {/* Cabeçalho com título centralizado e botão à direita */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={200} textAlign="center">
          {title}
        </Typography>

        {onClose && (
          <IconButton
            aria-label="Fechar"
            onClick={onClose}
            sx={{ position: "absolute", right: 0 }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Defina sua nova senha e confirme abaixo para concluir a recuperação.
      </Typography>

      {/* Nova senha */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 5 }}>
        <PasswordInput label="Senha" fullWidth value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <PasswordInput label="Confirmar Senha" fullWidth value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </Box>

      {/* Dica de estado (opcional) */}
      {(strong && match) && (
        <Typography variant="body2" color="success.main" sx={{ mb: 4, mt: -4 }}>
          Senha pronta para ser salva ✔
        </Typography>
      )}
    </Box>
  );
}
