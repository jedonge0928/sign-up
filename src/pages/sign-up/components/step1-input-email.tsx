"use client";
import { ISignUpForm } from "@/domains/auth/modals/auth.types";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import toast from "react-hot-toast";

interface Step1InputEmailProps {
  watch: UseFormWatch<ISignUpForm>;
  register: UseFormRegister<ISignUpForm>;
  setIsEmailCodeInput: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<number>>;
  isEmailCodeInput: boolean;
}

export default function Step1InputEmail({
  register,
  setIsEmailCodeInput,
  isEmailCodeInput,
  watch,
  setStep,
}: Step1InputEmailProps) {
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");

  const handlePostEmailCode = async () => {
    const email = watch("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      return;
    }

    try {
      toast.loading("이메일 발송 중...", {
        position: "bottom-center",
        style: {
          width: "100%",
          backgroundColor: "#333",
          color: "#fff",
          fontSize: "16px",
          marginBottom: "80px",
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.dismiss();
      toast.success("인증 메일을 발송 했습니다", {
        position: "bottom-center",
        style: {
          width: "100%",
          backgroundColor: "#333",
          color: "#fff",
          fontSize: "16px",
          marginBottom: "80px",
        },
      });
      setIsEmailCodeInput(true);
      setEmailError("");
    } catch (err) {
      toast.dismiss();
      toast.error("메일 발송 중 오류가 발생했습니다.");
    }
  };

  const handleCompleteEmailCode = async () => {
    const code = watch("emailCode");

    const exCode = "123456";

    if (code === exCode) {
      setCodeError("");
      toast.success("이메일 인증이 완료되었습니다", {
        position: "bottom-center",
        style: {
          width: "100%",
          backgroundColor: "#333",
          color: "#fff",
          fontSize: "16px",
          marginBottom: "80px",
        },
      });

      setTimeout(() => setStep((prev) => prev + 1), 1000);
    } else {
      setCodeError("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <>
      <div className="flex-1 space-y-3">
        <div className="text-white">
          <h2>이메일을 인증하세요</h2>
          <p>메일을 입력하면 메일이 발송 돼요</p>
        </div>{" "}
        <input
          type="text"
          className={`border w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white`}
          {...register("email")}
          placeholder="이메일을 입력해주세요"
        />{" "}
        {emailError && (
          <p className="text-[#FF5126] text-sm mt-1">{emailError}</p>
        )}
        {isEmailCodeInput && (
          <input
            type="text"
            className="border w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
            {...register("emailCode")}
            placeholder="인증 번호 6자리를 입력해 주세요"
          />
        )}
        {codeError && (
          <p className="text-[#FF5126] text-sm mt-1">{codeError}</p>
        )}
      </div>
      <div>
        {!isEmailCodeInput && (
          <button
            className={`text-white w-full py-4  rounded-md  ${
              watch("email")
                ? "bg-[#FF5126] border-[#FF5126] cursor-pointer"
                : "bg-gray-600"
            }`}
            disabled={!watch("email")}
            onClick={handlePostEmailCode}
          >
            인증 메일 전송
          </button>
        )}

        {isEmailCodeInput && (
          <button
            className={`text-white w-full py-4   rounded-md ${
              watch("emailCode") ? "bg-[#FF5126] cursor-pointer" : "bg-gray-600"
            }`}
            disabled={!watch("emailCode")}
            onClick={handleCompleteEmailCode}
          >
            메일 인증
          </button>
        )}
      </div>
    </>
  );
}
