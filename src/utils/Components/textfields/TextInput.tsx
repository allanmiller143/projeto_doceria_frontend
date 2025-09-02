// src/components/inputs/TextInput.tsx
import { forwardRef } from "react";
import type { ReactNode } from "react";
import { TextField, InputAdornment } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";

type Props = TextFieldProps & {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  compact?: boolean; // padding/altura mais enxuta
};

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ startAdornment, endAdornment, compact, InputProps, size, ...rest }, ref) => {
    return (
      <TextField
        {...rest}
        inputRef={ref}
        size={size ?? (compact ? "small" : "medium")}
        InputProps={{
          ...InputProps,
          startAdornment:
            startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : InputProps?.startAdornment,
          endAdornment:
            endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : InputProps?.endAdornment,
        }}
      />
    );
  }
);

export default TextInput;
