import { useEffect } from "react";
import ForgetPasswordContextProvider from "./pages/Login/ForgetPassword/Context/Provider";
import AppRouter from "./routes/AppRouter";

import { setOnDisconnect } from "./Services/api";
import Disconnected from "./utils/Disconnected/Index";
import DisconnectContextProvider from "./Services/DisconnectContext/Provider";
import UseDisconnectContext from "./Services/DisconnectContext/UseDisconnectContext";

function AppContent() {
  const { disconnected, setDisconnected } = UseDisconnectContext();

  useEffect(() => {
    setOnDisconnect(() => {
      setDisconnected(true);
    });
  }, [setDisconnected]);

  return (
    <>
      <AppRouter />
      {disconnected && <Disconnected />}
    </>
  );
}

export default function App() {
  return (
    <ForgetPasswordContextProvider>
      <DisconnectContextProvider>
        <AppContent />
      </DisconnectContextProvider>
    </ForgetPasswordContextProvider>
  );
}
