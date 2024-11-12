import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";

export const Profile = async () => {
  const session = await auth();

  return (
    <>
      {/* <Link href="/">
        <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link> */}
      <Link href={`/user/${session?.user?.id}`}>
        <span>{session?.user?.name}</span>
      </Link>
    </>
  );
};
