"use client";

import { ISignUpForm } from "@/domains/auth/modals/auth.types";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

interface Step1InputNameProps {
  watch: UseFormWatch<ISignUpForm>;
  register: UseFormRegister<ISignUpForm>;
  setIsNameInput: Dispatch<SetStateAction<boolean>>;
  setIsPasswordInput: Dispatch<SetStateAction<boolean>>;
  setIsPassword2Input: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<number>>;
  isNameInput: boolean;
  isPasswordInput: boolean;
  isPasswordInput2: boolean;
}

export default function Step1InputName({
  register,
  setIsNameInput,
  setIsPasswordInput,
  setIsPassword2Input,
  isNameInput,
  isPasswordInput,
  isPasswordInput2,
  watch,
  setStep,
}: Step1InputNameProps) {
  return (
    <>
      <div className="flex-1 space-y-3">
        <div className="text-white">
          <h2>계정을 설정해주세요</h2>
          <p>닉네임과 비밀번호를 설정해 주세요</p>
        </div>

        <input
          type="text"
          className="w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
          {...register("name")}
        />

        {isPasswordInput && (
          <input
            type="password"
            className=" w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
            {...register("password")}
          />
        )}

        {isPasswordInput2 && (
          <input
            type="password"
            className="w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
            {...register("password2")}
          />
        )}
      </div>

      <div>
        {!isNameInput && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              watch("name") ? "bg-[#FF5126] cursor-pointer" : "bg-gray-600"
            }`}
            disabled={!watch("name")}
            onClick={() => {
              setIsNameInput(true);
              setIsPasswordInput(true);
            }}
          >
            닉네임 인증
          </button>
        )}

        {isNameInput && !isPasswordInput && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              watch("name") ? "bg-[#FF5126] cursor-pointer" : "bg-gray-600"
            }`}
            onClick={() => setIsPasswordInput(true)}
          >
            다음
          </button>
        )}

        {isPasswordInput && !isPasswordInput2 && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              watch("password") ? "bg-[#FF5126] cursor-pointer" : "bg-gray-600"
            }`}
            disabled={!watch("password")}
            onClick={() => setIsPassword2Input(true)}
          >
            다음
          </button>
        )}

        {isPasswordInput2 && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              watch("password2") ? "bg-[#FF5126] cursor-pointer" : "bg-gray-600"
            }`}
            disabled={!watch("password2")}
            onClick={() => setStep((prev) => prev + 1)}
          >
            다음
          </button>
        )}
      </div>
    </>
  );
}
