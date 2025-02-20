"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter

function Header() {
  const path = usePathname(); // Get current path
  const router = useRouter(); // Initialize router

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-md">
      <Image src={"/logo.svg"} width={185} height={190} alt="logo" />
      <ul className="hidden md:flex gap-14">
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard" && "text-primary font-bold"
          }`}
          onClick={() => router.push("/dashboard")} // Navigate to dashboard
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/questions" && "text-primary font-bold"
          }`}
          onClick={() => router.push("/dashboard/tips")} // Navigate to questions
        >
          AI Tips
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/how" && "text-primary font-bold"
          }`}
          onClick={() => router.push("/dashboard/HowItWorks")} // Navigate to How it works
        >
          How it works ?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
