import { create } from "zustand";
import { ISignUpForm } from "../modals/auth.types";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

interface SignUpStore {
  form: ISignUpForm;
  step: number;
  setForm: (data: Partial<ISignUpForm>) => void;
  setStep: (num: number) => void;
  reset: () => void;
}

const initialForm: ISignUpForm = {
  email: "",
  name: "",
  password: "",
  password2: "",
  emailCode: "",
  birth: "",
  gender: "",
  adress: "",
  joinCategory: [],
  wantCategory: [],
};
export const useSignUpStore = create<SignUpStore>((set) => ({
  form: initialForm,
  step: 1,
  setForm: (data) => set((state) => ({ form: { ...state.form, ...data } })),
  setStep: (num) => set({ step: num }),
  reset: () => set({ form: initialForm, step: 1 }),
}));
