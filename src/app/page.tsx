import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link href={"/sign-up"}>회원가입</Link>
      <Link href={"/notification"}>알람</Link>
    </div>
  );
}
