// src/components/inputs/PasswordInput.tsx
import { useState, forwardRef } from "react";
import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextInput from "./TextInput";
import type { TextFieldProps } from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


type Props = Omit<TextFieldProps, "type"> & {
  initiallyVisible?: boolean;  // começa visível?
  compact?: boolean;
};

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ initiallyVisible = false, compact, ...rest }, ref) => {
    const [show, setShow] = useState(initiallyVisible);

    return (
      <TextInput
        {...rest}
        type={show ? "text" : "password"}
        inputRef={ref}
        compact={compact}
        startAdornment={<LockOutlinedIcon fontSize="small" />}
        endAdornment={
          <>
            <IconButton
              aria-label={show ? "Ocultar senha" : "Mostrar senha"}
              onClick={() => setShow((v) => !v)}
              edge="end"
              size={compact ? "small" : "medium"}
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </>
        }
      />
    );
  }
);

export default PasswordInput;
