import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StayKo — Find Your Home in Korea",
  description: "Long-term rental platform for international students in Korea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
