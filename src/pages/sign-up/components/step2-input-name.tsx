"use client";

import { ISignUpForm } from "@/domains/auth/modals/auth.types";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import toast from "react-hot-toast";

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
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");

  const toastStyle = {
    width: "100%",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "16px",
    marginBottom: "80px",
  };

  const handleValidateNickname = (nickname: string) => {
    const nicknameRegex = /^[a-z0-9가-힣]{1,8}$/;
    return nicknameRegex.test(nickname);
  };

  //중복아이디 체크 예시
  const checkDuplicateNickname = async (nickname: string) => {
    const duplicateList = ["user1", "홍길동", "test123"];
    return duplicateList.includes(nickname);
  };

  const handleCheckNickname = async () => {
    const nickname = watch("name");

    const isDubleNickname = await checkDuplicateNickname(nickname);

    if (!handleValidateNickname(nickname)) {
      setNicknameError("소문자·한글·숫자로만 구성된 8자 이내로 입력해 주세요.");
      toast.error("닉네임 형식을 확인해주세요", {
        position: "bottom-center",
        style: toastStyle,
      });
      return;
    }

    if (isDubleNickname) {
      setNicknameError("");
      toast.error("중복된 닉네임입니다.", {
        position: "bottom-center",
        style: toastStyle,
      });
      return;
    }

    setNicknameError("");
    toast.success("사용 가능한 닉네임입니다.", {
      position: "bottom-center",
      style: toastStyle,
    });
    setIsNameInput(true);
    setIsPasswordInput(true);
  };

  ///비밀번호 설정

  const passwordRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/;

  const handlePasswordNext = () => {
    const password = watch("password");
    if (!passwordRegex.test(password)) {
      setPasswordError("소문자·숫자·특수문자를 포함한 8~16자를 입력해 주세요.");
      toast.error("비밀번호 형식을 확인하세요", {
        position: "bottom-center",
        style: toastStyle,
      });
      return;
    }
    setPasswordError("");
    setIsPassword2Input(true);
  };

  //비밀번호 일치검사

  const handlePasswordMatch = () => {
    const password = watch("password");
    const password2 = watch("password2");

    if (password2 === "") {
      setPasswordMatch("비밀번호를 입력해 주세요");
    }
    if (password === password2) {
      setPasswordMatch("비밀번호가 일치합니다.");
      setStep((prev) => prev + 1);
    } else {
      setPasswordMatch("비밀번호가 일치하지 않습니다.");
    }
  };

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
          placeholder="소문자·한글·숫자로만 구성된 8자 이내로 입력"
        />
        {nicknameError && (
          <p className="text-[#FF5126] text-sm mt-1">{nicknameError}</p>
        )}
        {isPasswordInput && (
          <input
            type="password"
            className=" w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
            {...register("password")}
          />
        )}
        {passwordError && (
          <p className="text-[#FF5126] text-sm mt-1">{passwordError}</p>
        )}
        {isPasswordInput2 && (
          <input
            type="password"
            className="w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
            {...register("password2")}
          />
        )}{" "}
        {passwordMatch && (
          <p className="text-[#FF5126] text-sm mt-1">
            확인한 비밀번호가 일치하지 않습니다.
          </p>
        )}
      </div>

      <div>
        {!isNameInput && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              watch("name") ? "bg-[#FF5126] cursor-pointer" : "bg-gray-600"
            }`}
            disabled={!watch("name")}
            onClick={handleCheckNickname}
          >
            닉네임 인증
          </button>
        )}

        {/* {isNameInput && !isPasswordInput && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              watch("name") ? "bg-[#FF5126] cursor-pointer" : "bg-gray-600"
            }`}
            onClick={() => setIsPasswordInput(true)}
          >
            다음
          </button>
        )} */}

        {isPasswordInput && !isPasswordInput2 && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              watch("password") ? "bg-[#FF5126] cursor-pointer" : "bg-gray-600"
            }`}
            disabled={!watch("password")}
            onClick={handlePasswordNext}
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
            onClick={handlePasswordMatch}
          >
            다음
          </button>
        )}
      </div>
    </>
  );
}
