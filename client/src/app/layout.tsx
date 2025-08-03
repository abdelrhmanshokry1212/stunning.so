import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stunning.so",
  description: "A stunning visual experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="root-body" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
