import { toast } from "sonner";
import { post } from "../../../../Services/api";

export const sendReceivedCode = async (e: unknown,setLoading: (v: boolean) => void, email: string, setStep: (v: number) => void, code: string) => {
  // evita reload do form
  const evt = e as { preventDefault?: () => void };
  evt?.preventDefault?.();

  const emailClean = email.trim();
  console.log(code);

  // validação mínima
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(emailClean) && !emailClean.endsWith(".") && !emailClean.includes("..");

  if (!isEmail) {
    toast.error("Informe um e-mail válido.");
    return null;
  }

  setLoading(true);
  try {

    const res = await post<{ message: string; }>('/auth/code', { email: emailClean, code : code });
    console.log(res);
    setStep(3);
    toast.success("Código de verificação correto!");


  } catch (error) {
    const errorMessage = (error && typeof error === "object" && "message" in error) ? (error as { message?: string }).message : undefined;
    toast.error(errorMessage || "Código incorreto ou erro inesperado. Tente novamente mais tarde.");

    return null;
  } 
};
