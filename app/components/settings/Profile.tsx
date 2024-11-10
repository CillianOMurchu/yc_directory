import Link from "next/link";
import Image from "next/image";

export default function Profile() {
  return (
    <Link href="/">
      <Image src="/logo.png" alt="logo" width={144} height={30} />
    </Link>
  );
}
