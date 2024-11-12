import React from "react";
import { Login } from "@/app/components/Login";
import { Profile } from "@/app/components/settings/Profile";

export const Navbar = async () => {
  return (
    <header className="px-5 py-3 shadow-md backdrop-brightness-75">
      <nav className="flex items-center gap-3">
        <Profile />
        <Login />
      </nav>
    </header>
  );
};
