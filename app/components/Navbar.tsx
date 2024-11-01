import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Login } from "@/app/components/Login";

export const Navbar = async () => {

  return (
    <header className="px-5 py-3 bj-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

          <Login />

      </nav>
    </header>
  );
};
