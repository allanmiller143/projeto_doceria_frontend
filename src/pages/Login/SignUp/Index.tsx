import { Box } from "@mui/material";
import SignUpDialog from "./Components/SignUpDialogForm";
import Img from '../../../assets/imgs/authImg.jpg'

export default function SignUp() {
  
  return (
    <Box sx={{ p: 3, backgroundImage: `url(${Img})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh' }} >
      <SignUpDialog
        open={true}
        onClose={() => {}}
      />
    </Box>
  );
}
