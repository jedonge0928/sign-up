import { ISignUpForm } from "@/domains/auth/modals/auth.types";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

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
  return (
    <>
      <div className="flex-1 space-y-3">
        <div className="text-white">
          <h2>이메일을 인증하세요</h2>
          <p>메일을 입력하면 메일이 발송 돼요</p>
        </div>{" "}
        <input
          type="text"
          className="border w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
          {...register("email")}
        />
        {isEmailCodeInput && (
          <input
            type="text"
            className="border w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
            {...register("emailCode")}
          />
        )}
      </div>
      <div>
        {!isEmailCodeInput && (
          <button
            className={`text-white w-full py-4 border  ${
              watch("email") ? "bg-red-600 cursor-pointer" : "bg-gray-600"
            }`}
            disabled={!watch("email")}
            onClick={() => setIsEmailCodeInput(true)}
          >
            메일전송
          </button>
        )}

        {isEmailCodeInput && (
          <button
            className={`text-white w-full py-4 border  ${
              watch("emailCode") ? "bg-red-600 cursor-pointer" : "bg-gray-600"
            }`}
            disabled={!watch("emailCode")}
            onClick={() => setStep((prev) => prev + 1)}
          >
            메일인증
          </button>
        )}
      </div>
    </>
  );
}
