import { createContext } from "react";

export interface DisconnectContextValue {
  disconnected: boolean;
  setDisconnected: React.Dispatch<React.SetStateAction<boolean>>;

}

const DisconnectContext = createContext<DisconnectContextValue | undefined>(undefined);

export default DisconnectContext;
