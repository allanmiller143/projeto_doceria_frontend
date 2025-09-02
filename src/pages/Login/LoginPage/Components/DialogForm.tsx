import { useState } from "react";
import {DialogTitle,Typography,FormControlLabel,Checkbox,Link,Box, DialogContent, Stack} from "@mui/material";
import TextInput from '../../../../utils/Components/textfields/TextInput'
import PasswordInput from '../../../../utils/Components/textfields/PasswordInput'
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LoadingButton from "../../../../utils/Components/buttons/LoadingButton";
import { useNavigate } from "react-router-dom";
import { handleSubmit } from "../Functions/login";
import GlassDialog from "../../../../utils/Components/Dialog/GlassDialog";

type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function DialogForm({ open, onClose}: LoginDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  return (
    <GlassDialog open={open} onClose={onClose}>
      <DialogTitle sx={{  textAlign: "center" }}>
        <Typography fontSize={24} fontWeight={200} textAlign="center">Login</Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(e, setLoading, email, password, navigate); }} sx={{ pt: 2}}>
          <Stack spacing={2.2}>
            <TextInput label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} startAdornment={<EmailOutlinedIcon fontSize="small" />} />
            <PasswordInput label="Senha" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 0.5 }}
            >
              <FormControlLabel
                control={ <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} size="small" /> }
                label={<Typography variant="body2">Lembrar</Typography>}
              />
            <Link underline="hover" onClick={() => navigate('/login/esqueci-senha')} sx={{ cursor: "pointer" }}>
               Esqueceu a senha?
            </Link>
            </Stack>
            <LoadingButton type="submit" loading={loading} loadingText="Entrando..." children="Entrar" />
            <Typography variant="body1" align="center" sx ={{pt:4}}>
                Não possui conta?{" "}
                <Link
                    underline="hover"
                    onClick={() => {navigate('/sign-up')}}
                    sx={{ cursor: "pointer" }}
                >
                    Cadastre-se
                </Link>
            </Typography> 

          </Stack>
        </Box>
      </DialogContent>
    </GlassDialog>
  );
}
 