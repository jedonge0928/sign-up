export interface ISignUpForm {
  email: string;
  name: string;
  password: string;
  password2: string;
  emailCode: string;
  birth: string;
  gender?: string;
  adress: string;
  joinCategory: string[];
  wantCategory: string[];
}
