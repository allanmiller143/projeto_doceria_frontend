import ForgetPasswordContextProvider from "./pages/Login/ForgetPassword/Context/Provider";
import AppRouter from "./routes/AppRouter";

function App() {

  return (
    <ForgetPasswordContextProvider>
      <AppRouter />
    </ForgetPasswordContextProvider>
  );
}

export default App;
