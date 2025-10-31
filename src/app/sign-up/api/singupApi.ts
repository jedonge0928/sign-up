import { ISignUpForm } from "@/domains/auth/modals/auth.types";

// export async function PostSignUp(form: ISignUpForm) {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/signup`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     }
//   );

//   const result = await response.json();
//   if (!response.ok) throw new Error(result.message || "회원가입 실패");
//   return result;
// }

// : ISignUpForm

interface ApiProps {
  url: string;
  method?: string;
  errorMessage?: string;
  data?: unknown;
}
export async function Api({
  url,
  data = {},
  method = "get",
  errorMessage,
}: ApiProps) {
  const isGet = method.toLowerCase() === "get";
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (!isGet) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    options
  );

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || errorMessage);

  return result;
}
