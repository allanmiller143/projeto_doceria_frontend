import { DialogContent} from "@mui/material";
import LoadingButton from "../../../../utils/Components/buttons/LoadingButton";
import Step1 from "./Step1";
import UseForgetContext from "../Context/UseForgetContext";
import Step2 from "./Step2";
import Step3 from "./Step3";
import GlassDialog from "../../../../utils/Components/Dialog/GlassDialog";
import { sendVerifyCode } from "../Functions/sendVerifyCode";
import { sendReceivedCode } from "../Functions/sendReceivedCode";
import { changePassword } from "../Functions/changePassword";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

type ForgetPasswordDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function ForgetPasswordDialog({ open, onClose}: ForgetPasswordDialogProps) {
  const { step, setStep, loading, setLoading, email, code, newPassword, confirm } = UseForgetContext();
  const match = useMemo(() => confirm === newPassword && confirm.length > 0, [confirm, newPassword]);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      switch (step) {
        case 1:
          await sendVerifyCode(e, setLoading, email, setStep, false);
          break;
        case 2:
          await sendReceivedCode(e, setLoading, email, setStep, Array.isArray(code) ? code[0] : code);
          break;
        case 3:
          await changePassword(e, setLoading, email, setStep, newPassword, navigate, onClose);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const currentStep = () => {
    switch (step) {
      case 1:
        return <Step1 title="Recuperar Senha" onClose={onClose} />;
      case 2:
        return <Step2 title="Inserir Código" onClose={onClose} />;
      case 3:
        return <Step3 title="Trocar Senha" onClose={onClose} />;
      default:
        return null;
    }
  };


  return (
    <GlassDialog
      open={open}
      onClose={onClose}
    >
      <DialogContent>
        {currentStep()}
        <LoadingButton type="submit" loading={loading} loadingText="Carregando..." children= {step === 1 ? "Enviar Codigo" : step === 2 ? "validar código" : "Trocar senha"} fullWidth onClick={handleSubmit} disabled ={step===3 && !match} />
      </DialogContent>
    </GlassDialog>
  );
}
 