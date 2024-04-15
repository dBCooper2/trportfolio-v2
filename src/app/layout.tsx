import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My NextJS Portfolio",
  description: "My NextJS Professional Portfolio",
  icons: {
    icon: [
      {
        url: "/images/favicon.ico", // /public path
        href: "/images/favicon.ico", // /public path
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-cBg'>{children}</body>
    </html>
  );
}
