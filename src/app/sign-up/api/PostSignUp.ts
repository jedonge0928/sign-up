import { ISignUpForm } from "@/domains/auth/modals/auth.types";
import { Api } from "./singupApi";
import { SignUpPayload } from "@/app/views/component/types/signUpPayLoad-types";
import { postApi } from "./postAPI";

// /* 이메일 인증코드 발송 */
// export const PostEmailCode = async ({ email }: { email: string }) =>
//   Api({
//     url: `/api/users/send/code/${email}`,
//     method: "POST",
//     errorMessage: "메일 발송 중 오류가 발생했습니다.",
//   });
export const PostEmailCode = ({ email }: { email: string }) =>
  postApi(
    `/api/users/send/code/${email}`,
    {},
    "메일 발송 중 오류가 발생했습니다."
  );
/* 이메일 인증코드 재발송 */
// export const RePostEmailCode = async (email: string) =>
//   Api({
//     url: `/api/users/send/signup/${email}`,
//     method: "POST",
//     errorMessage: "메일 재발송 중 오류가 발생했습니다.",
//   });
export const RePostEmailCode = async (email: string) =>
  postApi(
    `/api/users/send/signup/${email}`,
    "메일 재발송 중 오류가 발생했습니다."
  );

/* 이메일 인증코드 검증 */
// export const VerifyEmailCode = async (form: { email: string; code: string }) =>
//   Api({
//     url: `/api/users/verify/code`,
//     method: "POST",
//     data: form,
//     errorMessage: "이메일 코드 검증 중 오류가 발생했습니다.",
//   });
export const VerifyEmailCode = async (form: { email: string; code: string }) =>
  postApi(
    `/api/users/verify/code`,
    form,
    "이메일 코드 검증 중 오류가 발생했습니다."
  );
// /* 회원가입 완료 */
// export const PostSignUp = async (form: ISignUpForm) =>
//   Api({
//     url: `/api/users/signup`,
//     method: "POST",
//     data: form,
//     errorMessage: "회원가입에 실패했습니다.",
//   });
/* 회원가입 완료 */
// export const PostSignUp = async (payload: SignUpPayload) =>
//   Api({
//     url: `/api/users/signup`,
//     method: "POST",
//     data: payload,
//     errorMessage: "회원가입에 실패했습니다.",
//   });

export const PostSignUp = (payload: SignUpPayload) =>
  postApi(`/api/users/signup`, payload, "회원가입에 실패했습니다.");
