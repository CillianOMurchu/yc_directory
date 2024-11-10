import React from "react";
import { auth } from "@/auth";
import Link from "next/link";
import { LoginButton } from "@/app/components/login/LoginButton";
import { LogoutButton } from "@/app/components/login/LogoutButton";

export const Login = async () => {
  const session = await auth();
  console.log('session.user is ', session?.user);
  return (
    <div className="flex items-center gap-5">
      {session && session.user ? (
        <>
          <LogoutButton />
          <Link href={`/user/${session.user.id}`}>
            <span>{session?.user.name}</span>
          </Link>
        </>
      ) : (
        <>
          <LoginButton provider={{ name: "google" }} />
        </>
      )}
    </div>
  );
};
