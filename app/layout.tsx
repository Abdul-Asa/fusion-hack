import type { Metadata } from "next";
import { Fraunces, Chivo } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const chivo = Chivo({
  subsets: ["latin"],
  variable: "--font-chivo",
});

export const metadata: Metadata = {
  title: "Money Trees",
  description: "Finance tracking meets gamification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${chivo.variable}`}>
        {children}
      </body>
    </html>
  );
}
