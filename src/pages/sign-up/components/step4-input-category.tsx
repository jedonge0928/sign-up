"use client";

import { ISignUpForm } from "@/domains/auth/modals/auth.types";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

interface StepInputCategoryProps {
  watch: UseFormWatch<ISignUpForm>;
  register: UseFormRegister<ISignUpForm>;
  setIsCategorySelect: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<number>>;
  isCategorySelect: boolean;
}

export default function StepInputCategory({
  register,
  watch,
  setIsCategorySelect,
  setStep,
  isCategorySelect,
}: StepInputCategoryProps) {
  return (
    <>
      <div className="flex-1 space-y-3">
        <div className="text-white">
          <h2>카테고리를 선택해 주세요</h2>
          <p>취향에 알맞는 컨텐츠를 추천해 드려요</p>
        </div>

        <select
          className="w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
          {...register("joinCategory")}
          defaultValue=""
        >
          <option value="" disabled>
            모임 카테고리를 선택해 주세요
          </option>
          <option value="문화">문화</option>
          <option value="운동">운동</option>
          <option value="푸드">푸드</option>
          <option value="게임">게임</option>
          <option value="여행">여행</option>
          <option value="예술">예술</option>
          <option value="자기 개발">자기 개발</option>
        </select>

        {isCategorySelect && (
          <select
            className="w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
            {...register("wantCategory")}
            defaultValue=""
          >
            <option value="" disabled>
              컨텐츠 카테고리를 선택해 주세요
            </option>
            <option value="연극">연극</option>
            <option value="무용">무용</option>
            <option value="복합">복합</option>
            <option value="뮤지컬">뮤지컬</option>
            <option value="관광지">관광지</option>
            <option value="레포츠">레포츠</option>
            <option value="대중 무용">대중 무용</option>
            <option value="서양 음악">서양 음악</option>
            <option value="한국 음악">한국 음악</option>
            <option value="대중 음악">대중 음악</option>
            <option value="서커스/마술">서커스/마술</option>
          </select>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {!isCategorySelect && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              watch("joinCategory") ? "bg-[#FF5126]" : "bg-gray-600"
            }`}
            disabled={!watch("joinCategory")}
            onClick={() => setIsCategorySelect(true)}
          >
            다음
          </button>
        )}

        {isCategorySelect && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              watch("wantCategory") ? "bg-[#FF5126]" : "bg-gray-600"
            }`}
            disabled={!watch("wantCategory")}
            onClick={() => setStep((prev) => prev + 1)}
          >
            완료
          </button>
        )}
      </div>
    </>
  );
}
