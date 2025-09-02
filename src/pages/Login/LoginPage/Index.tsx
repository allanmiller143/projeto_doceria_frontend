
import { Box } from "@mui/material";
import LoginDialog from "./Components/DialogForm";
import Img from '../../../assets/imgs/authImg.jpg'

export default function LoginPage() {

  return (
    <Box sx={{ p: 3, backgroundImage: `url(${Img})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh' }} >
      <LoginDialog
        open={true}
        onClose={() => {}}
      />
    </Box>
  );
}
