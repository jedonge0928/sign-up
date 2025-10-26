import { PostSignUp } from "@/app/sign-up/api/PostSignUp";
import { useMutation } from "@tanstack/react-query";

export function usePostSignUp() {
  return useMutation({
    mutationFn: PostSignUp,
  });
}
