"use client";

import { ISignUpForm } from "@/domains/auth/modals/auth.types";
import { useSignUpStore } from "@/domains/auth/store/useSignUpStore";
import toast from "react-hot-toast";
import { useState } from "react";
import { usePostSignUp } from "@/domains/auth/hook/usePostSignUp";

export default function StepInputCategory() {
  const { step, setStep, form, setForm, reset } = useSignUpStore();
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const mutation = usePostSignUp();

  const handleSignUp = () => {
    if (!form.email || !form.password || !form.name) {
      toast.error("필수 정보가 누락되었습니다.");
      return;
    }

    mutation.mutate(form as ISignUpForm, {
      onSuccess: (data) => {
        console.log("회원가입 성공:", data);
        toast.success("회원가입이 완료되었습니다!");
        reset();
        setStep(step + 1);
      },
      onError: (err: any) => {
        console.error("회원가입 실패:", err);
        toast.error("회원가입 중 오류가 발생했습니다.");
      },
    });
  };

  return (
    <>
      <div className="flex-1 space-y-3">
        <div className="text-white">
          <h2>카테고리를 선택해 주세요</h2>
          <p>취향에 알맞는 컨텐츠를 추천해 드려요</p>
        </div>
        <select
          className="w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
          value={form.joinCategory || ""}
          onChange={(e) =>
            setForm({
              joinCategory: e.target.value as ISignUpForm["joinCategory"],
            })
          }
        >
          <option value="" disabled>
            카테고리를 선택해주세요
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
            value={form.wantCategory || ""}
            onChange={(e) => setForm({ wantCategory: e.target.value })}
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
              form.joinCategory ? "bg-[#FF5126]" : "bg-gray-600"
            }`}
            disabled={!form.joinCategory}
            onClick={() => setIsCategorySelect(true)}
          >
            다음
          </button>
        )}

        {isCategorySelect && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              form.wantCategory ? "bg-[#FF5126]" : "bg-gray-600"
            }`}
            disabled={!form.wantCategory}
            onClick={handleSignUp}
          >
            회원가입 완료
          </button>
        )}
      </div>
    </>
  );
}
