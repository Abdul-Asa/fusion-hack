"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-24 bg-bland">
      <h1 className="max-w-lg p-8  text-5xl font-light tracking-tight text-center lg:text-7xl font-francues ">
        Money Trees
      </h1>
      <p className="text-xl font-light mb-16  text-center opacity-80 font-chivo text-main">
        Keep track of your finances and watch it grow
      </p>
      <div className="absolute lg:hidden transform  size-40 top-5 animate-float ">
        <Image src="/bush.png" alt="flower" fill />
      </div>
      <div className="absolute hidden delay-150 transform  size-[260px] bottom-64 right-20 animate-float lg:block">
        <Image src="/bush.png" alt="flower" fill />
      </div>
      <div className="absolute hidden delay-150 transform  size-[260px] bottom-64 left-20 animate-float lg:block">
        <Image src="/bush.png" alt="flower" fill />
      </div>
      <div className="absolute hidden transform  size-[260px] bottom-32 right-20 animate-float lg:block delay-225">
        <Image src="/bush.png" alt="flower" fill />
      </div>
      <div className="absolute hidden delay-300 transform  size-[260px] bottom-32 left-20 animate-float lg:block">
        <Image src="/bush.png" alt="flower" fill />
      </div>
      <div className="absolute hidden delay-375 transform  size-[260px] bottom-[10px] right-20 animate-float lg:block">
        <Image src="/bush.png" alt="flower" fill />
      </div>
      <div className="absolute hidden delay-450 transform  size-[260px] bottom-[10px] left-20 animate-float lg:block">
        <Image src="/bush.png" alt="flower" fill />
      </div>
      <Link className="mt-10" href={"/garden/settings"}>
        <Button>Get Started</Button>
      </Link>
    </main>
  );
}
