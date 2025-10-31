export interface ISignUpForm {
  email: string;
  name: string;
  password: string;
  password2: string;
  emailCode: string;
  birth: string;
  gender?: "남성" | "여성";
  adress: string;
  joinCategory: string;
  wantCategory: string;
}
