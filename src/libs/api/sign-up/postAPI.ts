import { useMutation } from "@tanstack/react-query";
import { request } from "./request";

export function postApi(url: string, data?: unknown, errorMessage?: string) {
  return request(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    errorMessage
  );
}
export const usePostEmailCode = () => {
  return useMutation({
    mutationFn: (email: string) =>
      postApi(`/api/users/send/code/${email}`, {}, "메일 발송 실패"),
  });
};
