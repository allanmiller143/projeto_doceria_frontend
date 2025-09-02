import { toast } from "sonner";
import { post } from "../../../../Services/api";

export const sendVerifyCode = async (e: unknown,setLoading: (v: boolean) => void, email: string, setStep: (v: number) => void, resend : boolean) => {
  // evita reload do form
  const evt = e as { preventDefault?: () => void };
  evt?.preventDefault?.();

  const emailClean = email.trim();

  // validação mínima
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(emailClean) && !emailClean.endsWith(".") && !emailClean.includes("..");

  if (!isEmail) {
    toast.error("Informe um e-mail válido.");
    return null;
  }

  setLoading(true);
  try {

    const res = await post<{ message: string; }>('/auth/forgot', { email: emailClean });
    console.log(res);
    if(!resend){
      setStep(2);
    }
      
    toast.success("Código de verificação enviado!");


  } catch (error) {
    const errorMessage = (error && typeof error === "object" && "message" in error) ? (error as { message?: string }).message : undefined;
    console.log(error);
    toast.error(errorMessage || "Falha ao enviar código de verificação. Tente novamente.");

    return null;
  } 
};
