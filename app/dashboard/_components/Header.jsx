"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

function Header() {
  const path = usePathname();
  const router = useRouter();
  const { isSignedIn } = useAuth(); // Check if user is signed in

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in"); // Redirect to sign-in if user is signed out
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-md">
      <Image src={"/logo.svg"} width={160} height={100} alt="logo" />
      <ul className="flex flex-col md:flex-row gap-4 md:gap-14">
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard" && "text-primary font-bold"
          }`}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/tips" && "text-primary font-bold"
          }`}
          onClick={() => router.push("/dashboard/tips")}
        >
          AI Tips
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/how" && "text-primary font-bold"
          }`}
          onClick={() => router.push("/dashboard/HowItWorks")}
        >
          How it works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
