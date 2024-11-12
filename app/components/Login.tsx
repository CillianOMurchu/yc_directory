import React from "react";
import { auth } from "@/auth";
import { LoginButton } from "@/app/components/login/LoginButton";
import { LogoutButton } from "@/app/components/login/LogoutButton";

export const Login = async () => {
  const session = await auth();
  return (
    <div className="flex justify-self-end items-center gap-3">
      {session && session.user ? (
        <LogoutButton />
      ) : (
        <LoginButton provider={{ name: "google" }} />
      )}
    </div>
  );
};
