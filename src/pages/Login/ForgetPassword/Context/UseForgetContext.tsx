// src/context/forget-password/UseForgetContext.tsx
import { useContext } from "react";
import ForgetPasswordContext from "./Context";

export default function useForgetContext() {
  const ctx = useContext(ForgetPasswordContext);
  if (!ctx) {
    throw new Error("useUser deve ser usado dentro de um UserProvider"); // Dica: troque a mensagem para "useForgetContext deve ser usado dentro de um ForgetPasswordContextProvider"
  }
  return ctx;
}
