"use client";

import toast from "react-hot-toast";
import { usePostSignUp } from "../hook/useSignUpHook";
import { useSignUpStore } from "@/domains/auth/store/useSignUpStore";
import { ISignUpForm } from "@/domains/auth/modals/auth.types";
import { SignUpPayload } from "@/app/views/component/types/signUpPayLoad-types";
import { convertToSignUpPayload } from "../hook/useConvertSignUp";

export default function SignUpForm() {
  const { mutate, isPending, isSuccess } = usePostSignUp();
  const { form } = useSignUpStore();

  // const handleSignUp = (): void => {
  //   if (!form.email || !form.password || !form.name) {
  //     toast.error("필수 입력값이 누락되었습니다.");
  //     return;
  //   }

  //   mutate(form as ISignUpForm, {
  //     onSuccess: () => toast.success("회원가입 성공!"),
  //     onError: (err: Error) => toast.error(err.message || "회원가입 실패"),
  //   });
  // };
  const handleSignUp = async (): Promise<void> => {
    if (!form.email || !form.password || !form.name) {
      toast.error("필수 입력값이 누락되었습니다.");
      return;
    }

    // 🔥 form(ISignUpForm) → 서버 요구값(SignUpPayload)로 변환
    const payload: SignUpPayload = convertToSignUpPayload(form);

    // 🔥 mutate 실행
    mutate(payload, {
      onSuccess: () => toast.success("회원가입 성공!"),
      onError: (err: Error) => toast.error(err.message || "회원가입 실패"),
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">회원가입</h2>

      <button
        onClick={handleSignUp}
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isPending ? "가입 중..." : "회원가입"}
      </button>

      {isSuccess && <p className="text-green-500">가입이 완료되었습니다!</p>}
    </div>
  );
}
