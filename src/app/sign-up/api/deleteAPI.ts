import { useMutation } from "@tanstack/react-query";
import { request } from "./request";

export function deleteApi(url: string, errorMessage?: string) {
  return request(
    url,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    },
    errorMessage
  );
}
export const useDeleteNotification = () => {
  return useMutation({
    mutationFn: (id: number) =>
      deleteApi(`/api/notification/${id}`, "삭제 실패"),
  });
};
