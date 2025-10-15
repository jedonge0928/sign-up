"use client";
import { ISignUpForm } from "@/domains/auth/modals/auth.types";
import Step1InputEmail from "@/pages/sign-up/components/step1-input-email";
import Step1InputName from "@/pages/sign-up/components/step2-input-name";
import StepInputProfile from "@/pages/sign-up/components/step3-input-profile";
import StepInputCategory from "@/pages/sign-up/components/step4-input-category";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const [step, setStep] = useState<number>(1);
  //
  const [isEmailCodeInput, setIsEmailCodeInput] = useState(false);
  //
  const [isNameInput, setIsNameInput] = useState(false);
  const [isPasswordInput, setIspasswordInput] = useState(false);
  const [isPassword2Input, setIsPassword2Input] = useState(false);
  //
  const [isBirthInput, setIsBirthInput] = useState(false);
  const [isGenderSelect, setIsGenderSelect] = useState(false);
  const [isAdressInput, setisAdressInput] = useState(false);

  //
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const { watch, register } = useForm<ISignUpForm>();

  const postEmail = async (email: string) => {
    const response = await fetch(`/api/users/send/code/${email}`, {
      method: "post",
    });
    const result = await response.json();
    return result;
  };

  const { mutate } = useMutation({
    mutationFn: (email: string) => {
      return postEmail(email);
    },
  });

  const handlePostEmailCode = () => {
    mutate(watch("email"));
  };

  console.log(watch("email"), "email");

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
        {step === 1 && (
          <Step1InputEmail
            isEmailCodeInput={isEmailCodeInput}
            register={register}
            setIsEmailCodeInput={setIsEmailCodeInput}
            setStep={setStep}
            watch={watch}
          />
        )}
        {step === 2 && (
          <Step1InputName
            register={register}
            watch={watch}
            setStep={setStep}
            isNameInput={isNameInput}
            setIsNameInput={setIsNameInput}
            isPasswordInput={isPasswordInput}
            setIsPasswordInput={setIspasswordInput}
            isPasswordInput2={isPassword2Input}
            setIsPassword2Input={setIsPassword2Input}
          />
        )}
        {step === 3 && (
          <StepInputProfile
            register={register}
            watch={watch}
            setStep={setStep}
            isBirthInput={isBirthInput}
            isGenderSelect={isGenderSelect}
            isAdressInput={isAdressInput}
            setIsBirthInput={setIsBirthInput}
            setIsGenderSelect={setIsGenderSelect}
            setisAdressInput={setisAdressInput}
          />
        )}
        {step === 4 && (
          <StepInputCategory
            register={register}
            watch={watch}
            setStep={setStep}
            isCategorySelect={isCategorySelect}
            setIsCategorySelect={setIsCategorySelect}
          />
        )}
      </div>
    </div>
  );
}
