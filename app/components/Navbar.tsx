import React from "react";
import { Login } from "@/app/components/Login";

export const Navbar = async () => {
  return (
    <header className="px-5 py-3 bj-white shadow-sm font-work-sans">
      <nav className="grid">
        <Login />
      </nav>
    </header>
  );
};
