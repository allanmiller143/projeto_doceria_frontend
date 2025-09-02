// src/pages/Login/ForgetPassword/Context/Provider.tsx
import { useState, type ReactNode } from "react";
import ForgetPasswordContext, { type ForgetPasswordContextValue } from "./Context";

type ForgetPasswordContextProviderProps = { children: ReactNode };

export default function ForgetPasswordContextProvider({ children }: ForgetPasswordContextProviderProps) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  

  const value: ForgetPasswordContextValue = { email, setEmail, step, setStep, loading, setLoading, code, setCode, newPassword, setNewPassword, confirm, setConfirm };

  return (
    <ForgetPasswordContext.Provider value={value}>
      {children}
    </ForgetPasswordContext.Provider>
  );
}
