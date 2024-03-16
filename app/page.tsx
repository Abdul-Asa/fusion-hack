"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-bland relative">
      <h1 className="text-4xl max-w-lg p-8 lg:text-7xl text-center font-francues font-light tracking-tight ">
        Money Trees
      </h1>
      <p className="text-xl opacity-80  text-center font-chivo font-light text-main">
        Keep track of your finances and watch it grow
      </p>
      <div className="bg-main transform size-40 lg:top-32 lg:right-10  top-10 absolute animate-float lg:block "></div>
      <div className="bg-main transform size-40 top-32 left-10 absolute animate-float lg:block hidden delay-150"></div>
      <div className="bg-main transform size-40 bottom-32 right-10 absolute animate-float lg:block hidden delay-225"></div>
      <div className="bg-main transform size-40 bottom-32 left-10 absolute animate-float lg:block hidden delay-300"></div>
      <Link className="mt-10" href={"/garden/setup"}>
        <Button>Get Started</Button>
      </Link>
    </main>
  );
}
