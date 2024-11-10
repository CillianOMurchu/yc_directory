import { Navbar } from "@/app/components/Navbar";
import { Theme } from "@radix-ui/themes";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Theme>
      <main>
        <Navbar />
        {children}
      </main>
    </Theme>
  );
}
