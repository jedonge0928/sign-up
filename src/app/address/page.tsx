"use client";

import AddressSearch from "@/app/components/AddressSearch";
import { useSignUpStore } from "@/domains/auth/store/useSignUpStore";
import { useState } from "react";

import toast from "react-hot-toast";

export default function StepInputProfile() {
  const { step, setStep, setForm, form } = useSignUpStore();
  const [birthError, setBirthError] = useState("");
  const [adressError, setAdressError] = useState("");

  const [isBirthInput, setIsBirthInput] = useState(false);
  const [isGenderSelect, setIsGenderSelect] = useState(false);
  const [isAdressInput, setIsAdressInput] = useState(false);

  //toastStyle
  const toastStyle = {
    width: "100%",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "16px",
    marginBottom: "80px",
  };

  const handleCheckBirth = () => {
    const birth = form.birth || "";
    const birthRegex = /^\d{8}$/;

    if (!birthRegex.test(birth)) {
      setBirthError("YYYYMMDD 형식에 맞춰 입력해 주세요");
      toast.error("생년월일 형식을 확인해주세요.", {
        position: "bottom-center",
        style: toastStyle,
      });
      return;
    }

    //birth 확인
    const year = Number(birth.slice(0, 4));
    const month = Number(birth.slice(4, 6));
    const day = Number(birth.slice(6, 8));

    const date = new Date(year, month - 1, day);
    const isValidDate =
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day;

    if (!isValidDate) {
      setBirthError("유효하지 않은 날짜입니다. 다시 확인해 주세요.");
      toast.error("올바른 생년월일을 입력해주세요.", {
        position: "bottom-center",
        style: toastStyle,
      });
      return;
    }
    setBirthError("");
    toast.success("생년월일이 확인되었습니다.", {
      position: "bottom-center",
      style: toastStyle,
    });

    setIsBirthInput(true);
    setIsGenderSelect(true);
  };

  //주소확인

  const handleCheckAdress = () => {
    const adress = form.adress;

    if (!adress || adress.trim() === "") {
      setAdressError("주소를 입력해주세요");
      toast.error("주소를 입력해주세요", {
        position: "bottom-center",
        style: toastStyle,
      });
      return;
    }
    setAdressError("");
    toast.success("주소가 확인되었습니다.", {
      position: "bottom-center",
      style: toastStyle,
    });
    setStep(step + 1);
  };
  return (
    <>
      <div className="flex-1 space-y-3">
        <div className="text-white">
          <h2>프로필 정보를 입력해주세요</h2>
          <p>생년월일 · 성별 · 주소를 입력해주세요</p>
        </div>
        <input
          value={form.birth || ""}
          onChange={(e) => setForm({ birth: e.target.value })}
          type="text"
          placeholder="생년월일 (YYYYMMDD)"
          className="w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
        />
        {birthError && (
          <p className="text-[#FF5126] text-sm mt-1 ">{birthError}</p>
        )}
        {isGenderSelect && (
          <select
            className="w-full border-white  bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
            value={form.gender}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "남성" || value === "여성") {
                setForm({ gender: value });
              }
            }}
          >
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        )}

        {isAdressInput && (
          <AddressSearch
            value={form.adress}
            onSelect={(selectedAddress) => setForm({ adress: selectedAddress })}
          />
        )}
      </div>

      <div className="mt-4 space-y-2">
        {!isGenderSelect && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              form.birth ? "bg-[#FF5126]" : "bg-gray-600"
            }`}
            disabled={!form.birth}
            onClick={handleCheckBirth}
          >
            다음
          </button>
        )}

        {isGenderSelect && !isAdressInput && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              form.gender ? "bg-[#FF5126]" : "bg-gray-600"
            }`}
            disabled={!form.gender}
            onClick={() => setIsAdressInput(true)}
          >
            다음
          </button>
        )}

        {isAdressInput && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              form.adress ? "bg-[#FF5126]" : "bg-gray-600"
            }`}
            disabled={!form.adress}
            onClick={handleCheckAdress}
          >
            다음
          </button>
        )}
      </div>
    </>
  );
}
