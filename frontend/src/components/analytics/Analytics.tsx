"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CustomBarChart } from "./CustomBarChart";
import { ChartAreaInteractive } from "./CustomAreaChart";
import { GetHorizontalUserAnalyticsBarChart } from "./userAnalyticsHorizontalBarChat";

export default function GetAnalyticsPage() {
  return (
    <div className="flex flex-col min-h-screen p-4 md:p-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      {/* Header section with flexible layout */}
      <div className="flex justify-between items-start mb-8 flex-col sm:flex-row">
        <div className="space-y-1 mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold mt-10 ml-15">
            Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 ml-15">
            A responsive overview of your key data.
          </p>
        </div>
        <Link href="/" className="self-start sm:self-center">
          <button className="flex items-center gap-2 text-blue-500 hover:underline mr-15">
            <ArrowLeft size={16} /> Back to Home
          </button>
        </Link>
      </div>

      {/* Main content area with a responsive grid for charts */}
      <div className="flex-1 w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
        <CustomBarChart />
        <GetHorizontalUserAnalyticsBarChart />
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
