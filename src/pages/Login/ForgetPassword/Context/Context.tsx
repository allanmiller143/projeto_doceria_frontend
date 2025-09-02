// src/pages/Login/ForgetPassword/Context/Context.ts
import { createContext } from "react";

export interface ForgetPasswordContextValue {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  code: string[];
  setCode: React.Dispatch<React.SetStateAction<string[]>>;
  newPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  confirm: string;
  setConfirm: React.Dispatch<React.SetStateAction<string>>;
}

const ForgetPasswordContext = createContext<ForgetPasswordContextValue | undefined>(undefined);

export default ForgetPasswordContext;
