import { create } from "zustand";
import { ISignUpForm } from "../modals/auth.types";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

interface SignUpStore {
  form: Partial<ISignUpForm>;
  step: number;
  setForm: (data: Partial<ISignUpForm>) => void;
  setStep: (num: number) => void;
  reset: () => void;
}
export const useSignUpStore = create<SignUpStore>((set) => ({
  form: {
    email: "",
    password: "",
    name: "",
    joinCategory: "",
    wantCategory: "",
  },
  step: 1,
  setForm: (data) => set((state) => ({ form: { ...state.form, ...data } })),
  setStep: (num) => set({ step: num }),
  reset: () => set({ form: {}, step: 1 }),
}));
