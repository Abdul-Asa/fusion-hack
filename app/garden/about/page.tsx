import React from "react";
import { Card } from "@/components/ui/card";
import { MobileMenu } from "@/components/mobile-menu";
import Link from "next/link";
import { FileText } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="flex flex-col h-full lg:p-10 p-6">
      <div className="flex justify-between mb-2 lg:mb-10 items-center">
        <h1 className="lg:text-3xl text-lg text-main">About</h1>
        <MobileMenu />
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="p-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-light text-main">🌱💰</h2>
            <h3 className="text-2xl font-semibold text-main">Money Trees</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A financial tracking application that uses garden metaphors to
              make managing money engaging and intuitive, while ensuring you
              maintain complete control over your data.
            </p>
            <p className="text-emerald-600 italic">
              &ldquo;A penny saved is a penny earned&rdquo;
            </p>
          </div>
        </Card>

        {/* Core Philosophy */}
        <Card className="p-8">
          <h3 className="text-2xl font-semibold mb-6 text-main flex items-center">
            <FileText className="mr-3" size={24} />
            File Over App Philosophy
          </h3>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg mb-6">
            <p className="text-gray-700 italic leading-relaxed mb-4">
              &ldquo;File over app is a philosophy: if you want to create
              digital artifacts that last, they must be files you can control,
              in formats that are easy to retrieve and read.&rdquo;
            </p>
            <p className="text-emerald-600 font-medium">
              — Steph Ango, CEO of Obsidian
            </p>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Money Trees is built on this principle. Your financial data belongs
            to you, in formats that will outlast any single application. We
            believe your files are more important than our app. All data is
            stored locally on your device. You can export/import your data as
            CSV at any time.
          </p>
        </Card>

        {/* How It Works */}
        <Card className="p-8">
          <h3 className="text-2xl font-semibold mb-6 text-main">
            How Money Trees Works
          </h3>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-main flex items-center">
              🌱 Garden Visualization
            </h4>
            <p className="text-gray-600 mb-4">
              Your financial data is transformed into an interactive garden
              where your money grows like plants. Each transaction, savings
              goal, and financial milestone becomes part of your flourishing
              financial ecosystem.
            </p>
          </div>
        </Card>

        {/* Getting Started */}
        <Card className="p-8">
          <h3 className="text-2xl font-semibold mb-6 text-main">
            Getting Started
          </h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-main">Set Up Your Profile</h4>
                <p className="text-gray-600">
                  Visit{" "}
                  <Link
                    href="/garden/settings"
                    className="text-emerald-600 hover:underline"
                  >
                    Settings
                  </Link>{" "}
                  to enter your name and choose your preferred currency.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-main">Import Your Data</h4>
                <p className="text-gray-600">
                  Use the{" "}
                  <Link
                    href="/garden/import"
                    className="text-emerald-600 hover:underline"
                  >
                    Import
                  </Link>{" "}
                  page to upload existing financial data via CSV, or start
                  fresh.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-main">
                  Watch Your Garden Grow
                </h4>
                <p className="text-gray-600">
                  Visit your{" "}
                  <Link
                    href="/garden"
                    className="text-emerald-600 hover:underline"
                  >
                    Garden
                  </Link>{" "}
                  to see your financial data come to life and track your
                  progress.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <p className="lg:block hidden text-xs text-center pt-10 text-main">
        Made with 💜 by Shehu
      </p>
    </div>
  );
};

export default About;
