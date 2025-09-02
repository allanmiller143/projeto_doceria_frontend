/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {DialogTitle, Typography, Box, DialogContent, Stack, Button, Divider, Link} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import TextInput from "../../../../utils/Components/textfields/TextInput";
import PasswordInput from "../../../../utils/Components/textfields/PasswordInput";
import LoadingButton from "../../../../utils/Components/buttons/LoadingButton";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GlassDialog from "../../../../utils/Components/Dialog/GlassDialog";
import { post } from "../../../../Services/api";

type SignUpDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function SignUpDialogForm({ open, onClose }: SignUpDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  // const canSubmit = email.trim().length > 0 && password.length >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!canSubmit) return;
    setLoading(true);

    const emailClean = email.trim();

    // validação mínima
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(emailClean) && !emailClean.endsWith(".") && !emailClean.includes("..");

    if (!isEmail) {
      toast.error("Informe um e-mail válido.");
      return null;
    }

    if (!password) {
      toast.error("Informe sua senha.");
      return null;
    }

    try {
      // chame sua API de cadastro aqui
      const res = await post<{ message: string }>('/users', { email, password });
      console.log(res);
      setEmail(""); setPassword("");
      navigate('/');
      toast.success("Conta criada com sucesso!");
      onClose();
    } catch (error) {
      console.error(error);
      const errorMessage = (error && typeof error === "object" && "message" in error) ? (error as any).message : "Falha ao criar conta. Tente novamente.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      // inicie seu fluxo OAuth do Google aqui
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Ainda vou implementar o login com Google.");
      onClose();
    } catch {
      toast.error("Falha ao iniciar login com Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <GlassDialog open={open} onClose={onClose} >
      <DialogTitle sx={{ textAlign: "center" }}>
        <Typography fontWeight={200} fontSize={24} textAlign="center">
          Criar conta
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ pt: 2 }}>
          <Stack spacing={2.2}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              startIcon={<GoogleIcon />}
              sx={{
                borderRadius: 999,
                textTransform: "none",
                py: 1.1,
                fontWeight: 600,
              }}
            >
              {googleLoading ? "Conectando..." : "Continuar com Google"}
            </Button>

            <Divider>
              <Typography variant="caption" color="text.secondary">ou</Typography>
            </Divider>

            <TextInput label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} startAdornment={<EmailOutlinedIcon fontSize="small" />} inputProps={{ autoComplete: "email", inputMode: "email" }}/>
            <PasswordInput label="Senha" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            <LoadingButton type="submit" loading={loading} loadingText="Criando..." > Criar conta </LoadingButton>
            
            <Typography variant="body1" align="center" sx={{ pt:4 }}>
              Já tem uma conta?{" "}
              <Link underline="hover" onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
                Entrar
              </Link>
            </Typography>
          </Stack>
        </Box>
      </DialogContent>
    </GlassDialog>
  );
}
