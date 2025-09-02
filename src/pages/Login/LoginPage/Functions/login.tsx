import { toast } from "sonner";
import { post } from '../../../../Services/api'

export const handleSubmit = async (e: unknown,setLoading: (v: boolean) => void,email: string,password: string, navigate: (path: string) => void) => {
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

  if (!password) {
    toast.error("Informe sua senha.");
    return null;
  }

  setLoading(true);
  try {

    const res = await post<{ message: string; access_token: string; refresh_token: string }>('/auth/login', { email: emailClean, password });
    localStorage.setItem('access_token', res.access_token); localStorage.setItem('refresh_token', res.refresh_token);
    toast.success("Login realizado!");
    navigate('/home');

  } catch (error) {
    const errorMessage = (error && typeof error === "object" && "message" in error) ? (error as { message?: string }).message : undefined;
    console.log(error);
    toast.error(errorMessage || "Falha ao fazer login. Tente novamente.");

    return null;
  } finally {
    setLoading(false);
  }
};
