export interface ISignUpForm {
  email: string;
  name: string;
  password: string;
  password2: string;
  emailCode: string;
  birth: string;
  gender?: "남성" | "여성";
  adress: string;
  joinCategory:
    | "문화"
    | "운동"
    | "푸드"
    | "게임"
    | "여행"
    | "예술"
    | "자기 개발";
  wantCategory: string;
}
