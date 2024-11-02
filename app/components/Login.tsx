import React from "react";
import { auth, signOut, signIn } from "@/auth";
import Link from "next/link";

export const Login = async () => {
  const session = await auth();

  return (
    <div className="flex items-center gap-5">
      {session && session.user ? (
        <>
          <Link href="/startup/create">
            <span>Create</span>
          </Link>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit">Signout</button>
          </form>
          <Link href={`/user/${session.user.id}`}>
            <span>{session?.user.name}</span>
          </Link>
        </>
      ) : (
        <>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button type="submit">Login With Github</button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button type="submit">Login With Google</button>
          </form>
        </>
      )}
    </div>
  );
};
