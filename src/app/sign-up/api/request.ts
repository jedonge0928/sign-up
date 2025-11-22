// domains/common/api/request.ts
export async function request(
  url: string,
  options: RequestInit,
  errorMessage?: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    options
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return result;
}
