"use client";

import { TextField } from "@mui/material";
import { SignUpInputProps } from "./types/signUp-input-types";

export default function SignUpInput({
  label,
  value,
  onChange,
  error,
  type = "text",
}: SignUpInputProps) {
  const inputStyle = {
    input: { color: "white" },
    label: { color: "gray" },
    "& label.Mui-focused": {
      color: "#ff5126",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "gray" },
      "&:hover fieldset": { borderColor: "#FF5126" },
      "&.Mui-focused fieldset": { borderColor: "#FF5126" },
    },
  };

  return (
    <div className="mt-5">
      <TextField
        fullWidth
        label={label}
        variant="outlined"
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        sx={inputStyle}
      />
      {error && <p className="text-[#FF5126] text-sm mt-1">{error}</p>}
    </div>
  );
}
