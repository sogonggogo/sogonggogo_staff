import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "미스터 대박 Staff",
  description: "Staff management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
