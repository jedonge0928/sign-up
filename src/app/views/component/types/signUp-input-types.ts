import { SelectProps, SxProps, Theme } from "@mui/material";

export interface SignUpInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}
export interface PassWordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
export interface SelectInputProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
}
export interface SignUpMultiSelectProps {
  label: string;
  value: string[];
  options: string[];
  max?: number;
  onChange: (value: string[]) => void;
  MenuProps?: SelectProps["MenuProps"];
  inputStyle?: SxProps<Theme>;
}
export interface SignUpPayload {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  address: string;
  latitude: number;
  longitude: number;
  birthDate: string;
  gender: "MALE" | "FEMALE";
  isMarketingAgreed: boolean;
}
