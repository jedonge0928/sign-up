import { useQuery } from "@tanstack/react-query";
import { request } from "./request";

export function getApi(url: string, errorMessage?: string) {
  return request(
    url,
    {
      method: "GET",
    },
    errorMessage
  );
}

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getApi("/api/users/me", "유저 정보 조회 실패"),
  });
};
