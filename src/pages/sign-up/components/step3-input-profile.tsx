"use client";

import { ISignUpForm } from "@/domains/auth/modals/auth.types";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

interface StepInputProfileProps {
  watch: UseFormWatch<ISignUpForm>;
  register: UseFormRegister<ISignUpForm>;
  setIsBirthInput: Dispatch<SetStateAction<boolean>>;
  setIsGenderSelect: Dispatch<SetStateAction<boolean>>;
  setisAdressInput: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<number>>;
  isBirthInput: boolean;
  isGenderSelect: boolean;
  isAdressInput: boolean;
}

export default function StepInputProfile({
  register,
  watch,
  setIsBirthInput,
  setIsGenderSelect,
  setisAdressInput,
  setStep,
  isBirthInput,
  isGenderSelect,
  isAdressInput,
}: StepInputProfileProps) {
  return (
    <>
      <div className="flex-1 space-y-3">
        <div className="text-white">
          <h2>프로필 정보를 입력해주세요</h2>
          <p>생년월일 · 성별 · 주소를 입력해주세요</p>
        </div>
        <input
          type="text"
          placeholder="생년월일 (YYYYMMDD)"
          className="w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
          {...register("birth")}
        />

        {isGenderSelect && (
          <select
            className="w-full border-white  bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
            {...register("gender")}
            defaultValue=""
          >
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        )}

        {isAdressInput && (
          <input
            type="text"
            placeholder="주소 입력"
            className="w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
            {...register("adress")}
          />
        )}
      </div>

      <div className="mt-4 space-y-2">
        {!isGenderSelect && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              watch("birth") ? "bg-[#FF5126]" : "bg-gray-600"
            }`}
            disabled={!watch("birth")}
            onClick={() => setIsGenderSelect(true)}
          >
            다음
          </button>
        )}

        {isGenderSelect && !isAdressInput && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              watch("gender") ? "bg-[#FF5126]" : "bg-gray-600"
            }`}
            disabled={!watch("gender")}
            onClick={() => setisAdressInput(true)}
          >
            다음
          </button>
        )}

        {isAdressInput && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              watch("adress") ? "bg-[#FF5126]" : "bg-gray-600"
            }`}
            disabled={!watch("adress")}
            onClick={() => setStep((prev) => prev + 1)}
          >
            다음
          </button>
        )}
      </div>
    </>
  );
}
