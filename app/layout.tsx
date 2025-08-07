import type { Metadata } from "next";
import { Fraunces, Chivo } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Provider } from "@/components/provider";
import Script from "next/script";

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
        <Provider>
          {children}
          <Toaster position="bottom-right" richColors />
        </Provider>
      </body>
    </html>
  );
}
