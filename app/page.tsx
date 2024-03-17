"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-24 bg-bland">
      <h1 className="max-w-lg p-8 text-4xl font-light tracking-tight text-center lg:text-7xl font-francues ">
        Money Trees
      </h1>
      <p className="text-xl font-light text-center opacity-80 font-chivo text-main">
        Keep track of your finances and watch it grow
      </p>
      <div className="absolute overflow-hidden transform size-40 bg-main lg:top-32 lg:right-10 top-10 animate-float lg:block "></div>
      <div className="absolute hidden delay-150 transform bg-main size-40 top-32 left-10 animate-float lg:block"></div>
      <div className="absolute hidden transform bg-main size-40 bottom-32 right-10 animate-float lg:block delay-225"></div>
      <div className="absolute hidden delay-300 transform bg-main size-40 bottom-32 left-10 animate-float lg:block"></div>
      <Link className="mt-10" href={"/garden/settings"}>
        <Button>Get Started</Button>
      </Link>
    </main>
  );
}
