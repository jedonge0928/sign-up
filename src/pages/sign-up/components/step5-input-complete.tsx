"use client";
import { useEffect, useState } from "react";

export default function StepSignUpComplete() {
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate(true);
      setTimeout(() => setRotate(false), 3000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <img
        src="/signup_check.svg"
        alt="회원가입 완료"
        className={`w-1xl transition-transform duration-1000 ${
          rotate ? "rotate-y-[360deg]" : ""
        }`}
      />
    </div>
  );
}
