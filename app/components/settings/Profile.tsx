import Link from "next/link";
import { auth } from "@/auth";

export const Profile = async () => {
  const session = await auth();

  return (
    <Link href={`/user/${session?.user?.id}`}>
      <span>{session?.user?.name}</span>
    </Link>
  );
};
