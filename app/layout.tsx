import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lead generator",
  description: "A directory of businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        </body>
    </html>
  );
}
