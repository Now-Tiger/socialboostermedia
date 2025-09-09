"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CustomBarChart } from "./CustomBarChart";
import { ChartAreaInteractive } from "./CustomAreaChart";
import { GetHorizontalUserAnalyticsBarChart } from "./userAnalyticsHorizontalBarChat";

export default function GetAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      {/* Main container with proper navbar spacing */}
      <div className="pt-16 sm:pt-20 md:pt-24 px-4 md:px-6 lg:px-8">
        {/* Header section aligned with navbar logo */}
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-8 flex-col sm:flex-row">
            <div className="space-y-1 mb-4 sm:mb-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Analytics Dashboard
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                A responsive overview of your key data.
              </p>
            </div>
            <Link href="/" className="self-start sm:self-center flex-shrink-0">
              <button className="flex items-center gap-2 text-blue-500 hover:underline transition-colors">
                <ArrowLeft size={16} /> Back to Home
              </button>
            </Link>
          </div>

          {/* Main content area with responsive grid for charts */}
          <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pb-8">
            <CustomBarChart />
            <GetHorizontalUserAnalyticsBarChart />
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}
