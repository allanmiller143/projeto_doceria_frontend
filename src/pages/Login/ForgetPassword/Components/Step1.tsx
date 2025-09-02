import { Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import TextInput from "../../../../utils/Components/textfields/TextInput";
import UseForgetContext from "../Context/UseForgetContext";

type Step1Props = {
  title: string;
  onClose?: () => void;
};

export default function Step1({ title, onClose }: Step1Props) {
  const { email, setEmail } = UseForgetContext();

  return (
    <Box component="form">
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
            sx={{
              position: "absolute",
              right: 0,
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="start"
        sx={{ mb: 2 }}
      >
        Informe o e-mail cadastrado para enviarmos um código de verificação.
      </Typography>

      <Box sx={{ mb: 5 }}>
        <TextInput
          fullWidth
          label="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          startAdornment={<EmailOutlinedIcon fontSize="small" />}
        />
      </Box>
    </Box>
  );
}
