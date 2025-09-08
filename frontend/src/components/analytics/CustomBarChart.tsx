"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { UserAnalyticsChart, UserAnalyticsApiResponse } from "@/types/analytics/userAnalytics";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

interface Fields {
  heightClass?: string;
}

const apiEndPoint = process.env.djangoBackendUrl + 'user-analytics/';
const options = {
  method: "GET",
  headers: { "Content-type": "application/json; charset=UTF-8" },
};

export const CustomBarChart = ({ heightClass = "h-64" }: Fields) => {
  const [data, setData] = useState<UserAnalyticsChart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        console.log(`Api: ${apiEndPoint}`)
        const response = await fetch(apiEndPoint, {
          ...options,
          signal: controller.signal,
        });
        if (response.ok) {
          const apiResponse: UserAnalyticsApiResponse[] = await response.json();

          // Group by month
          const monthMap: Record<string, { desktop: number; mobile: number }> = {};

          apiResponse.forEach((item) => {
            const month = new Date(item.date).toLocaleString("en-US", {
              month: "short",
            });
            if (!monthMap[month]) {
              monthMap[month] = { desktop: 0, mobile: 0 };
            }
            monthMap[month].desktop += item.desktop;
            monthMap[month].mobile += item.mobile;
          });

          // Converting to array for Recharts
          const transformed: UserAnalyticsChart[] = Object.entries(
            monthMap,
          ).map(([month, values]) => ({
            month,
            desktop: values.desktop,
            mobile: values.mobile,
          }));

          setData(transformed);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        if (error instanceof Error) {
          console.error("Error fetching data:", error.message);
        } else {
          console.error("Unexpected error", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Visitors Activity</CardTitle>
          <CardDescription>
            Showing monthly visitors (Desktop vs Mobile)
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-center text-gray-500">
              Loading users activities...
            </p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className={`w-full ${heightClass}`}
          >
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};
