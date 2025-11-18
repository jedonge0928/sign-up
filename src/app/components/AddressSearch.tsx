"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

declare global {
  interface Window {
    daum: any;
  }
}

interface AddressSearchProps {
  value?: string;
  onSelect: (address: string) => void;
}

export default function AddressSearch({ value, onSelect }: AddressSearchProps) {
  const [error, setError] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const toastStyle = {
    width: "100%",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "16px",
    marginBottom: "80px",
  };

  const handleClickAddressSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      toast.error("주소검색 모듈이 아직 로드되지 않았습니다.", {
        position: "bottom-center",
        style: toastStyle,
      });
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        const fullAddress = data.address;
        const region = data.sido || data.region_1depth_name;

        if (region !== "서울") {
          setError("서울 이외의 지역은 선택할 수 없습니다.");
          onSelect("");
          toast.error("서울 지역만 선택 가능합니다.", {
            position: "bottom-center",
            style: toastStyle,
          });
          return;
        }

        setError("");
        onSelect(fullAddress);
        toast.success("주소가 확인되었습니다!", {
          position: "bottom-center",
          style: toastStyle,
        });
      },
    }).open();
  };

  return (
    <div>
      <input
        type="text"
        value={value || ""}
        readOnly
        placeholder="주소를 검색하려면 클릭하세요"
        onClick={handleClickAddressSearch}
        className="w-full border-white bg-gray-600 px-2 py-5 rounded-md text-xl text-white cursor-pointer"
      />
      {error && (
        <p className="text-[#FF5126] text-sm mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
