"use client";

import {
  usePostEmailCode,
  useVerifyEmailCode,
} from "@/app/sign-up/hook/useSignUpHook";
import SignUpInput from "@/app/views/component/SignUpinput";
import { useSignUpStore } from "@/domains/auth/store/useSignUpStore";
import { useState } from "react";

import toast from "react-hot-toast";

export default function Step1InputEmail() {
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const { form, setForm, setStep, step } = useSignUpStore();
  const [isEmailCodeInput, setIsEmailCodeInput] = useState(false);
  const { mutate, isPending } = usePostEmailCode();
  const { mutate: verifyCodeMutate, isPending: isVerifying } =
    useVerifyEmailCode();

  const handlePostEmailCode = async () => {
    const email = form.email || "";
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
  // const handlePostEmailCode = () => {
  //   const email = form.email || "";
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!emailRegex.test(email)) {
  //     setEmailError("이메일 형식이 올바르지 않습니다.");
  //     return;
  //   }

  //   mutate(
  //     { email },
  //     {
  //       onSuccess: (data) => {
  //         toast.success("인증 메일을 발송했습니다.", {
  //           position: "bottom-center",
  //           style: {
  //             width: "100%",
  //             backgroundColor: "#333",
  //             color: "#fff",
  //             fontSize: "16px",
  //             marginBottom: "80px",
  //           },
  //         });
  //         setIsEmailCodeInput(true);
  //         setEmailError("");
  //       },
  //       onError: (error) => {
  //         console.error("메일 발송 실패:", error);
  //         toast.error("메일 발송 중 오류가 발생했습니다.");
  //       },
  //     }
  //   );
  // };

  const handleCompleteEmailCode = async () => {
    if (form.emailCode === "123456") {
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

      setTimeout(() => setStep(step + 1), 800);
    } else {
      setCodeError("인증번호가 올바르지 않습니다.");
    }
  };

  /////////////찐
  // const handleCompleteEmailCode = () => {
  //   if (!form.email || !form.emailCode) {
  //     setCodeError("이메일 또는 인증번호가 누락되었습니다.");
  //     return;
  //   }

  //   verifyCodeMutate(
  //     { email: form.email, code: form.emailCode },
  //     {
  //       onSuccess: (data) => {
  //         toast.success("이메일 인증이 완료되었습니다.", {
  //           position: "bottom-center",
  //           style: {
  //             width: "100%",
  //             backgroundColor: "#333",
  //             color: "#fff",
  //             fontSize: "16px",
  //             marginBottom: "80px",
  //           },
  //         });
  //         setCodeError("");
  //         setTimeout(() => setStep(step + 1), 800);
  //       },
  //       onError: (error) => {
  //         console.error("이메일 코드 검증 실패:", error);
  //         setCodeError("인증번호가 올바르지 않습니다.");
  //         toast.error("이메일 인증에 실패했습니다.");
  //       },
  //     }
  //   );
  // };

  return (
    <>
      <div className="flex-1 space-y-3">
        <div className="text-white">
          <h2>이메일을 인증하세요</h2>
          <p>메일을 입력하면 메일이 발송 돼요</p>
        </div>
        <div>
          <SignUpInput
            label="email"
            value={form.email || ""}
            onChange={(v) => setForm({ email: v })}
            error={emailError}
          />
          {/* <input
          value={form.email || ""}
          onChange={(e) => setForm({ email: e.target.value })}
          type="text"
          className={`border w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white `}
          placeholder="이메일을 입력해주세요"
        />{" "} */}
          {emailError && (
            <p className="text-[#FF5126] text-sm mt-1">{emailError}</p>
          )}{" "}
        </div>

        <div className="mt-5">
          {isEmailCodeInput && (
            <SignUpInput
              label="인증 번호 6자리를 입력해 주세요"
              value={form.emailCode || ""}
              onChange={(v) => setForm({ emailCode: v })}
              error={codeError}
            />
          )}
          {/* {isEmailCodeInput && (
            <TextField
              fullWidth
              label="인증 번호 6자리를 입력해 주세요"
              variant="outlined"
              value={form.emailCode || ""}
              onChange={(e) => setForm({ emailCode: e.target.value })}
              sx={inputStyle}
            />
          )} */}
          {/* {isEmailCodeInput && (
          <input
            value={form.emailCode || ""}
            onChange={(e) => setForm({ emailCode: e.target.value })}
            type="text"
            className="border w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
            placeholder="인증 번호 6자리를 입력해 주세요"
          />
        )} */}
          {codeError && (
            <p className="text-[#FF5126] text-sm mt-1">{codeError}</p>
          )}
        </div>
      </div>
      <div>
        {!isEmailCodeInput && (
          <button
            className={`text-white w-full py-4  rounded-md  ${
              form.email
                ? "bg-[#FF5126] border-[#FF5126] cursor-pointer"
                : "bg-gray-600"
            }`}
            disabled={!form.email}
            onClick={handlePostEmailCode}
          >
            인증 메일 전송
          </button>
        )}

        {isEmailCodeInput && (
          <button
            className={`text-white w-full py-4   rounded-md ${
              form.emailCode ? "bg-[#FF5126] cursor-pointer" : "bg-gray-600"
            }`}
            disabled={!form.emailCode}
            onClick={handleCompleteEmailCode}
          >
            메일 인증
          </button>
        )}
      </div>
    </>
  );
}
