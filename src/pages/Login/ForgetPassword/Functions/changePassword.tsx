import { toast } from "sonner";
import { post } from "../../../../Services/api";

export const changePassword = async (e: unknown, setLoading: (v: boolean) => void, email: string, setStep: (v: number) => void, password: string, navigate: (path: string) => void, onClose: () => void) => {
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

    const res = await post<{ message: string; }>('/auth/reset', { email: emailClean, newPassword: password });
    console.log(res);
    onClose();
    navigate('/');
    toast.success("Senha alterada com sucesso!");


  } catch (error) {
    const errorMessage = (error && typeof error === "object" && "message" in error) ? (error as { message?: string }).message : undefined;
    toast.error(errorMessage || "Falha ao alterar a senha. Tente novamente mais tarde.");
    setStep(1);

    return null;
  } 
};
