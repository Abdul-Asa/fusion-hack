"use client";

import { Button } from "@/components/ui/button";
import CurrencyBadge from "@/components/ui/currency-badge";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative px-6 h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Floating Elements with diverse plant images */}
        <div className="absolute top-16 left-12 w-16 h-16 opacity-20 animate-float">
          <Image
            src="/palm-big.png"
            alt="palm tree"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute top-24 right-20 w-20 h-20 opacity-15 animate-float delay-300">
          <Image
            src="/tang-big.png"
            alt="tree"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 opacity-25 animate-float delay-500">
          <Image src="/bush.png" alt="bush" fill className="object-contain" />
        </div>

        <div className="absolute bottom-40 right-1/4 w-18 h-18 opacity-15 animate-float delay-1000">
          <Image
            src="/aut-big.png"
            alt="autumn tree"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute top-40 left-1/3 w-10 h-10 opacity-30 animate-float delay-200">
          <Image
            src="/white-big.png"
            alt="white tree"
            fill
            className="object-contain"
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-main">
            Money Trees
            <span className="ml-4">🌱💰</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-8 font-light">
            Keep track of your finances and watch them grow
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/garden/settings">
              <Button
                size="lg"
                className="bg-main hover:bg-main/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Start Growing Your Garden
              </Button>
            </Link>
            <Link href="/garden/import">
              <Button
                variant="outline"
                size="lg"
                className="border-main text-main hover:bg-main/5 px-8 py-4 text-lg rounded-full"
              >
                Import Your Data
              </Button>
            </Link>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-main/5 to-slate-50 rounded-3xl p-12 shadow-2xl border border-main/10">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌱</div>
                  <div className="text-sm font-medium text-main">
                    Start Small
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-7xl mb-4">🌳</div>
                  <div className="text-sm font-medium text-main">
                    Grow Steady
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-8xl mb-4">🌲</div>
                  <div className="text-sm font-medium text-main">
                    Flourish Together
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-float hidden sm:block border border-main/10">
              <div className="text-2xl mb-1">📈</div>
              <div className="text-xs font-bold text-emerald-600">+15.2%</div>
              <div className="text-xs text-slate-500">This Month</div>
            </div>

            <div className="absolute -bottom-6 -right-10 bg-white rounded-2xl p-4 shadow-xl animate-float-delayed hidden sm:block border border-main/10">
              <div className="text-2xl mb-1">💰</div>
              <div className="text-xs font-bold text-emerald-600">$8,450</div>
              <div className="text-xs text-slate-500">Total Growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-main/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16 text-main">
            Financial Growth, Beautifully Visualized
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Garden Visualization */}
            <div className="p-8 ">
              <h3 className="text-3xl font-light mb-6 text-main">
                🌱 Garden Visualization
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Watch your finances flourish like a garden.
              </p>
            </div>
            <div className="relative h-60 bg-gradient-to-br from-main/10 to-main/20 rounded-3xl flex items-center justify-center shadow-lg border border-main/20">
              <div className="text-8xl ">🌳🌿🌱</div>
              <div className="absolute top-4 right-4 w-12 h-12 ">
                <Image
                  src="/palm-big.png"
                  alt="palm"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute bottom-4 left-4 w-10 h-10 ">
                <Image
                  src="/tang-big.png"
                  alt="tree"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Data Management */}
            <div className="lg:order-2 p-8">
              <h3 className="text-3xl font-light mb-6 text-main">
                📊 Complete Data Control
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Import existing financial data via CSV. Export your complete
                history anytime.
              </p>

              <div>
                <h4 className="text-sm font-medium text-main mb-3">
                  Supported Currencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  <CurrencyBadge currency="USD" symbol="$" />
                  <CurrencyBadge currency="EUR" symbol="€" />
                  <CurrencyBadge currency="GBP" symbol="£" />
                  <CurrencyBadge currency="JPY" symbol="¥" />
                  <CurrencyBadge currency="NGN" symbol="₦" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-black to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 text-left border border-main/10">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2"></div>
                <span className="text-white/80 text-sm ml-2">
                  my-money-trees-data.csv
                </span>
              </div>
              <div className="font-mono text-sm text-emerald-300">
                Date,Amount,Category,Currency
                <br />
                <span className="text-white/70">
                  2024-01-15,$500,Investment,USD
                </span>
                <br />
                <span className="text-white/70">
                  2024-01-16,€300,Savings,EUR
                </span>
                <br />
                <span className="text-white/70">...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-main text-white text-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-4 left-8 w-6 h-6 animate-float delay-200 opacity-80">
          <Image src="/bush.png" alt="tree" fill className="object-contain" />
        </div>
        <div className="absolute bottom-6 right-12 w-6 h-6 animate-float delay-1000 opacity-80">
          <Image src="/bush.png" alt="bush" fill className="object-contain" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-lg mb-4">
            <em>Made with 💜 by Shehu</em>
          </p>
          <div className="mt-8 text-sm opacity-80">
            <p>
              Inspired by the{" "}
              <a
                href="https://stephango.com/file-over-app"
                className="text-emerald-300 hover:text-emerald-200 underline transition-colors"
              >
                File Over App
              </a>{" "}
              philosophy
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
