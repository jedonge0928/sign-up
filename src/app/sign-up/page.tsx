"use client";
import { useSignUpStore } from "@/domains/auth/store/useSignUpStore";
import Step1InputEmail from "@/pages/sign-up/components/step1-input-email";
import Step1InputName from "@/pages/sign-up/components/step2-input-name";
import StepInputProfile from "@/pages/sign-up/components/step3-input-profile";
import StepInputCategory from "@/pages/sign-up/components/step4-input-category";
import StepSignUpComplete from "@/pages/sign-up/components/step5-input-complete";

export default function SignUp() {
  const { step } = useSignUpStore();

  return (
    <div className="bg-black flex justify-center">
      <div className="bg-black h-screen p-4 flex flex-col w-[700px]">
        <h2 className="text-white text-xl flex justify-center items-center py-2">
          회원가입
        </h2>
        <div className="flex gap-2 py-5">
          {[1, 2, 3, 4].map((_step) => (
            <div
              key={_step}
              className={`py-1  flex-1 ${
                step >= _step ? "bg-[#FF5126]" : "bg-gray-500"
              }`}
            ></div>
          ))}
        </div>
        {step === 1 && <Step1InputEmail />}
        {step === 2 && <Step1InputName />}
        {step === 3 && <StepInputProfile />}
        {step === 4 && <StepInputCategory />}
        {step === 5 && <StepSignUpComplete />}
      </div>
    </div>
  );
}
