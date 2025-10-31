import {
  PostEmailCode,
  PostSignUp,
  RePostEmailCode,
  VerifyEmailCode,
} from "../api/PostSignUp";
import { useBaseMutation } from "./useBaseMutation";

/* 이메일 인증코드 발송 */
export const usePostEmailCode = () => useBaseMutation(PostEmailCode);

/* 이메일 인증코드 재발송 */
export const useRePostEmailCode = () => useBaseMutation(RePostEmailCode);

/* 이메일 코드 검증 */
export const useVerifyEmailCode = () => useBaseMutation(VerifyEmailCode);

/* 회원가입 완료 */
export const usePostSignUp = () => useBaseMutation(PostSignUp);
