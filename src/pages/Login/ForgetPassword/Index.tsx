

// src/pages/Home/Index.tsx
import { useState } from "react";
import { Box } from "@mui/material";
import LoginDialog from "./Components/ForgetPasswordDialog";
import { useNavigate } from "react-router-dom";
import Img from '../../../assets/imgs/authImg.jpg'
import UseForgetContext from "./Context/UseForgetContext";


export default function ForgetPassword() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const {setEmail, setStep } = UseForgetContext();

  return (
    <Box sx={{ p: 3, backgroundImage: `url(${Img})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh' }} >
      <LoginDialog
        open={open}
        onClose={() => {navigate('/'); setOpen(false); setEmail(''); setStep(1);}}
      />
    </Box>
  );
}
