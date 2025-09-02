import { forwardRef } from "react";
import { Button, CircularProgress } from "@mui/material";
import type { ButtonProps } from "@mui/material/Button";

type Props = ButtonProps & {
  loading?: boolean;
  loadingText?: string;       // texto enquanto carrega (se omitido, mantém children)
  spinnerSize?: number;       // tamanho do CircularProgress
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // função chamada ao clicar
};

const LoadingButton = forwardRef<HTMLButtonElement, Props>(
  ({ loading = false, loadingText, spinnerSize = 18, disabled, children, startIcon, endIcon, sx, onClick, ...rest }, ref) => {
    // quando estiver carregando, desabilita e mostra spinner + texto
    const content = loading ? (loadingText ?? children) : children;

    return (
      <Button
        ref={ref}
        variant="contained"
        disabled={loading || disabled}
        startIcon={!loading ? startIcon : undefined}
        endIcon={!loading ? endIcon : undefined}
        onClick={onClick}
        sx={{
          position: "relative",
          // estilos “padrão” do seu botão de login (ajuste à vontade)
          py: 1.2,
          fontWeight: 700,
          borderRadius: 999, // pill
          ...sx,
        }}
        {...rest}
      >
        {content}

        {loading && (
          <CircularProgress
            size={spinnerSize}
            color="inherit"
            sx={{
              position: "absolute",
              right: 12,
              // se preferir o spinner à esquerda, troque para left: 12
            }}
          />
        )}
      </Button>
    );
  }
);

export default LoadingButton;
