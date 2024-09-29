"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center border shadow-2xl shadow-slate-600">
      <div className="flex flex-row items-center">
        <Image src={"/logo.svg"} alt="logo" width={40} height={50} />
        <span className="p-2 text-blue-900 font-bold text-xl">Smart Wallet AI</span>
      </div>
      {isSignedIn ? (
        <div className="ml-auto flex gap-3">
          <Link href={"/dashboard"}>
          <Button variant="outline" className="rounded-full border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-semibold"
>
              Dashboard
            </Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <div className="ml-auto flex gap-3">
          <Link href={"/sign-in"}> {/* Redirect to sign-in page */}
            <Button variant="outline" className="rounded-full text-blue-900">
              Sign In
            </Button>
          </Link>
          <Link href={"/sign-up"}> {/* Redirect to sign-up page */}
            <Button className="rounded-full">
              Get started with Smart Wallet
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
