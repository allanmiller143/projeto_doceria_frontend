import { useEffect, useMemo, useRef, useState } from "react";
import {Typography,Box,IconButton,TextField,Stack,Link,} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

import UseForgetContext from "../Context/UseForgetContext";
import { sendVerifyCode } from "../Functions/sendVerifyCode";

type Step2Props = {
  title: string;
  onClose?: () => void;
  onResend?: () => Promise<void> | void; // callback quando clicar em reenviar (opcional)
};

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

export default function Step2({ title, onClose }: Step2Props) {
  const { email, setStep, setCode, code, setLoading } = UseForgetContext();
  const [codeArray, setCodeArray] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [touched, setTouched] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

useEffect(() => {
  setCode(codeArray.join("")); // transforma o array em string
  console.log(code); // mostra a string no console
}, [codeArray, setCode]);


  // máscara leve do e-mail para exibição
  const maskedEmail = useMemo(() => {
    if (!email) return "";
    const [user, domain] = email.split("@");
    if (!domain) return email;
    const head = user.slice(0, 2);
    const tail = user.slice(-1);
    return `${head}${"*".repeat(Math.max(1, user.length - 3))}${tail}@${domain}`;
  }, [email]);

  // cooldown do "reenviar"
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  // handlers
  const handleChange = (idx: number, value: string) => {
    const v = value.replace(/\D/g, ""); // só dígitos
    if (!v) {
      setCodeArray((prev) => {
        const next = [...prev];
        next[idx] = "";
        return next;
      });
      return;
    }

    setCodeArray((prev) => {
      const next = [...prev];
      next[idx] = v[0];
      return next;
    });

    // avança foco
    if (idx < CODE_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codeArray[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowRight" && idx < CODE_LENGTH - 1) {
      e.preventDefault();
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const chars = pasted.split("");
    setCodeArray((prev) => {
      const next = [...prev];
      for (let i = 0; i < CODE_LENGTH; i++) next[i] = chars[i] ?? "";
      return next;
    });
    // foca no último preenchido
    const last = Math.min(pasted.length, CODE_LENGTH) - 1;
    if (last >= 0) inputsRef.current[last]?.focus();
  };

  const filled = codeArray.join("").length === CODE_LENGTH;

  const handleBack = () => {
    setTouched(false);
    setCodeArray(Array(CODE_LENGTH).fill(""));
    setStep((prev: number) => Math.max(1, prev - 1));
  };

  const handleResend = async (e: React.FormEvent) => {
    if (cooldown > 0) return;
    setCooldown(RESEND_SECONDS);
    try {
      await sendVerifyCode(e, setLoading, email, setStep, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" noValidate>
      {/* Cabeçalho: título central + fechar */}
      <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", position: "relative", mb: 2, }}>
        <Typography variant="h5" fontWeight={200} textAlign="center"> {title} </Typography>

        {onClose && (
          <IconButton
            aria-label="Fechar"
            onClick={onClose}
            sx={{ position: "absolute", right: 0 }}
          >
            <CloseIcon />
          </IconButton>
        )}

        <IconButton
            aria-label="Fechar"
            onClick={handleBack}
            sx={{ position: "absolute", left: 0 }}
          >
            <ArrowBack />
        </IconButton>

      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Enviamos um código para <strong>{maskedEmail || email}</strong>. Digite os 5 dígitos abaixo.
      </Typography>

      {/* Inputs do código */}
      <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mb: 2 }}>
        {Array.from({ length: CODE_LENGTH }).map((_, i) => (
          <TextField
            key={i}
            inputRef={(el) => (inputsRef.current[i] = el)}
            value={codeArray[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 1,
              "aria-label": `Dígito ${i + 1} do código`,
              style: { textAlign: "center", fontSize: 22, width: 44 },
            }}
            variant="outlined"
            size="small"
          />
        ))}
      </Stack>

      {/* Feedback simples quando tocar e não estiver completo */}
      {touched && !filled && (
        <Typography variant="caption" color="error" sx={{ display: "block", textAlign: "center", mb: 1 }}>
          Código incompleto. Preencha os 5 dígitos.
        </Typography>
      )}

      {/* Ações secundárias */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={1}
        sx={{ mt: 2 }}
      >


        <Typography variant="body2" color="text.secondary" pb ={5}>
          Não recebeu o código?{" "}
          <Link
            component="button"
            type="button"
            disabled={cooldown > 0}
            onClick={handleResend}
            sx={{ fontWeight: 600 }}
          >
            {cooldown > 0 ? `Reenviar em ${cooldown}s` : "Clique aqui para enviar novamente"}
          </Link>
        </Typography>
      </Stack>

      {/* gatilho pra validar quando sair do campo */}
      <Box sx={{ height: 0, overflow: "hidden" }}>
        <button type="submit" onClick={(e) => { e.preventDefault(); setTouched(true); }} />
      </Box>
    </Box>
  );
}
