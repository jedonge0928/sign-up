import { SignUpPayload } from "@/app/views/component/types/signUpPayLoad-types";
import { ISignUpForm } from "@/domains/auth/modals/auth.types";

export const convertToSignUpPayload = (form: ISignUpForm): SignUpPayload => {
  return {
    email: form.email,
    password: form.password,
    confirmPassword: form.password2,
    nickname: form.name,
    address: form.adress,
    birthDate: form.birth,
    gender: form.gender as "MALE" | "FEMALE",
    latitude: 0.1,
    longitude: 0.1,
    isMarketingAgreed: true,
  };
};
