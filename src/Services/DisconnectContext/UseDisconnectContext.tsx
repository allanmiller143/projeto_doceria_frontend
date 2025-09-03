// src/context/forget-password/UseForgetContext.tsx
import { useContext } from "react";
import DisconnectContext from "./Context";

export default function UseDisconnectContext() {
  const ctx = useContext(DisconnectContext);
  if (!ctx) {
    throw new Error("useDisconnectContext deve ser usado dentro de um DisconnectContextProvider");
  }
  return ctx;
}
