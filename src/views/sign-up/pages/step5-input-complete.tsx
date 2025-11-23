"use client";
import { useSignUpStore } from "@/domains/auth/store/useSignUpStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StepSignUpComplete() {
  const router = useRouter();
  const [rotate, setRotate] = useState(false);
  const { form, reset } = useSignUpStore();

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("회원가입 실패");

      alert("회원가입이 완료되었습니다!");
      reset(); // 상태 초기화
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setRotate(true);
      setTimeout(() => setRotate(false), 3000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    console.log("✅ 회원가입 최종 데이터:", form);
  }, [form]);

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-black">
        <img
          src="/signup_check.svg"
          alt="회원가입 완료"
          className={`w-1xl transition-transform duration-1000 ${
            rotate ? "rotate-y-[360deg]" : ""
          }`}
        />
      </div>
      <button
        className="text-white w-full py-4   rounded-md bg-[#FF5126] cursor-pointer"
        onClick={() => router.push("/")}
      >
        홈으로
      </button>
    </>
  );
}
