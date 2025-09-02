import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Index";
import Login from "../pages/Login/LoginPage/Index";
import ForgetPassword from "../pages/Login/ForgetPassword/Index";
import NotFound from "../pages/NotFound/Index";
import SignUpDialogForm from "../pages/Login/SignUp/Index";

// componente que declara TODAS as rotas do app
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/login/esqueci-senha" element={<ForgetPassword />} />
        <Route path="/sign-up" element={<SignUpDialogForm />} />
        <Route path="/home" element={<Home />} />

        {/* rota coringa (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}


