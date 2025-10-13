"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link href={"/sign-up"}>회원가입</Link>
    </div>
  );
}
