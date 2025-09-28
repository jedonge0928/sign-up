"use client";

import { useGetMovies } from "@/domains/movies/hooks/use-get-movies";
import { useState } from "react";

export default function Home() {
  const { isPending, isError, data, error } = useGetMovies();
  const [inputValue, setInputValue] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  return (
    <div>
      <div className="flex justify-between items-center p-10">
        <h2 className="text-2xl font-bold">영화정보조회</h2>
        <div className="flex gap-5">
          <input
            type="text"
            placeholder="영화검색"
            className="border"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") setSearch(inputValue);
            }}
          />
          <button
            className="border rounded-[5px] p-2"
            onClick={() => {
              setSearch(inputValue);
            }}
          >
            검색
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-20 p-[50px]">
        {data
          ?.filter((movie, index) => movie.movieNm.includes(search))
          ?.map((movie, index) => (
            <div key={index}>
              <div className="w-[200px] h-[250px] rounded-[5px] bg-gray-600"></div>
              <p className="max-w-[180px]">{movie.movieNm}</p>
              <p>{movie.movieCd}</p>
              <p>{movie.prdtYear}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
