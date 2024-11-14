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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
          integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-cBg">{children}</body>
    </html>
  );
}
