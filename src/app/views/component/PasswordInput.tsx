"use client";

import {
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { PassWordInputProps } from "@/app/types/sign-up/signUp-input-types";

export default function SignUpPasswordInput({
  label,
  value,
  onChange,
  error,
}: PassWordInputProps) {
  const [show, setShow] = useState(false);

  const inputStyle = {
    input: { color: "white" },
    label: { color: "gray" },
    "& label.Mui-focused": { color: "#ff5126" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "gray" },
      "&:hover fieldset": { borderColor: "#FF5126" },
      "&.Mui-focused fieldset": { borderColor: "#FF5126" },
    },
  };

  return (
    <div className="mt-5">
      <FormControl sx={{ width: "100%", ...inputStyle }} variant="outlined">
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShow(!show)} sx={{ color: "gray" }}>
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      </FormControl>
      {error && <p className="text-[#FF5126] text-sm mt-1">{error}</p>}
    </div>
  );
}
