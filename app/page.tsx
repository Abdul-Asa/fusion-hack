"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-24 bg-bland">
      <h1 className="max-w-lg p-8 text-4xl font-light tracking-tight text-center lg:text-7xl font-francues ">
        Money Trees
      </h1>
      <p className="text-xl font-light text-center opacity-80 font-chivo text-main">
        Keep track of your finances and watch it grow
      </p>
      <div className="absolute w-full h-full overflow-hidden transform lg:top-32 lg:right-10 top-10 animate-float lg:block ">
        <spline-viewer
          url="https://prod.spline.design/3cBtucf7YufGTNVI/scene.splinecode"
          loading="auto"
        ></spline-viewer>
      </div>
      <div className="absolute hidden delay-150 transform bg-main size-40 top-32 left-10 animate-float lg:block"></div>
      <div className="absolute hidden transform bg-main size-40 bottom-32 right-10 animate-float lg:block delay-225"></div>
      <div className="absolute hidden delay-300 transform bg-main size-40 bottom-32 left-10 animate-float lg:block"></div>
      <Link className="mt-10" href={"/garden/setup"}>
        <Button>Get Started</Button>
      </Link>
    </main>
  );
}
