import React from "react";
import { Login } from "@/app/components/Login";

export const Navbar = async () => {
  return (
    <header className="px-5 py-3 bj-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Login />
      </nav>
    </header>
  );
};
