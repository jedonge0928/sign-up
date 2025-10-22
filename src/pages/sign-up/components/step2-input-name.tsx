"use client";

import { useSignUpStore } from "@/domains/auth/store/useSignUpStore";
import { useState } from "react";

import toast from "react-hot-toast";

export default function Step1InputName() {
  const { step, form, setForm, setStep } = useSignUpStore();

  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");

  const [isNameInput, setIsNameInput] = useState(false);
  const [isPasswordInput, setIsPasswordInput] = useState(false);
  const [isPasswordInput2, setIsPasswordInput2] = useState(false);

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
    const nickname = form.name || "";

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
    const password = form.password || "";
    if (!passwordRegex.test(password)) {
      setPasswordError("소문자·숫자·특수문자를 포함한 8~16자를 입력해 주세요.");
      toast.error("비밀번호 형식을 확인하세요", {
        position: "bottom-center",
        style: toastStyle,
      });
      return;
    }
    setPasswordError("");
    setIsPasswordInput2(true);
  };

  //비밀번호 일치검사

  const handlePasswordMatch = () => {
    const password = form.password || "";
    const password2 = form.password2 || "";

    if (password2 === "") {
      setPasswordMatch("비밀번호를 입력해 주세요");
    }
    if (password === password2) {
      setPasswordError("");
      toast.success("비밀번호가 일치합니다!", {
        position: "bottom-center",
        style: toastStyle,
      });
      setStep(step + 1);
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
          value={form.name || ""}
          onChange={(e) => setForm({ name: e.target.value })}
          type="text"
          className="w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
          placeholder="소문자·한글·숫자로만 구성된 8자 이내로 입력"
        />
        {nicknameError && (
          <p className="text-[#FF5126] text-sm mt-1">{nicknameError}</p>
        )}
        {isPasswordInput && (
          <input
            value={form.password || ""}
            onChange={(e) => setForm({ password: e.target.value })}
            type="password"
            className=" w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
          />
        )}
        {passwordError && (
          <p className="text-[#FF5126] text-sm mt-1">{passwordError}</p>
        )}
        {isPasswordInput2 && (
          <input
            value={form.password2 || ""}
            onChange={(e) => setForm({ password2: e.target.value })}
            type="password"
            className="w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white"
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
              form.name ? "bg-[#FF5126] cursor-pointer" : "bg-gray-600"
            }`}
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
              form.password ? "bg-[#FF5126] cursor-pointer" : "bg-gray-600"
            }`}
            disabled={!form.password}
            onClick={handlePasswordNext}
          >
            다음
          </button>
        )}

        {isPasswordInput2 && (
          <button
            className={`text-white w-full py-4 rounded-md ${
              form.password2 ? "bg-[#FF5126] cursor-pointer" : "bg-gray-600"
            }`}
            disabled={!form.password2}
            onClick={handlePasswordMatch}
          >
            다음
          </button>
        )}
      </div>
    </>
  );
}
