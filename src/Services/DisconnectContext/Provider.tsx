// src/pages/Login/ForgetPassword/Context/Provider.tsx
import { useState, type ReactNode } from "react";
import ForgetPasswordContext, { type DisconnectContextValue } from "./Context";

type DisconnectContextProviderProps = { children: ReactNode };

export default function DisconnectContextProvider({ children }: DisconnectContextProviderProps) {

  const [disconnected, setDisconnected] = useState(false);

  const value: DisconnectContextValue = { disconnected, setDisconnected };

  return (
    <ForgetPasswordContext.Provider value={value}>
      {children}
    </ForgetPasswordContext.Provider>
  );
}
