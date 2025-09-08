"use client";

import { useState, useEffect, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartType, ApiResponse, chartConfig, publicBitCoinUrl, options } from "@/types/analytics/crypto";

export const description = "Cryptocurrency Performance Analysis";

export function ChartAreaInteractive() {
  const [chartType, setChartType] = useState<ChartType>("performance");
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState<ApiResponse["Data"] | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(publicBitCoinUrl, options);
        if (res.ok) {
          const apiResponse: ApiResponse = await res.json();
          setCryptoData(apiResponse.Data);
        }
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        if (error instanceof Error) {
          console.error("Error fetching crypto data:", error.message);
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

  const chartData = useMemo(() => {
    if (!cryptoData) return [];

    const btcData = cryptoData["BTC-USD"];
    const ethData = cryptoData["ETH-USD"];

    switch (chartType) {
      case "performance":
        return [
          {
            timeframe: "24H",
            bitcoin: Number(
              btcData.MOVING_24_HOUR_CHANGE_PERCENTAGE.toFixed(2),
            ),
            ethereum: Number(
              ethData.MOVING_24_HOUR_CHANGE_PERCENTAGE.toFixed(2),
            ),
          },
          {
            timeframe: "7D",
            bitcoin: Number(btcData.MOVING_7_DAY_CHANGE_PERCENTAGE.toFixed(2)),
            ethereum: Number(ethData.MOVING_7_DAY_CHANGE_PERCENTAGE.toFixed(2)),
          },
          {
            timeframe: "30D",
            bitcoin: Number(btcData.MOVING_30_DAY_CHANGE_PERCENTAGE.toFixed(2)),
            ethereum: Number(
              ethData.MOVING_30_DAY_CHANGE_PERCENTAGE.toFixed(2),
            ),
          },
          {
            timeframe: "90D",
            bitcoin: Number(btcData.MOVING_90_DAY_CHANGE_PERCENTAGE.toFixed(2)),
            ethereum: Number(
              ethData.MOVING_90_DAY_CHANGE_PERCENTAGE.toFixed(2),
            ),
          },
          {
            timeframe: "1Y",
            bitcoin: Number(btcData.CURRENT_YEAR_CHANGE_PERCENTAGE.toFixed(2)),
            ethereum: Number(ethData.CURRENT_YEAR_CHANGE_PERCENTAGE.toFixed(2)),
          },
        ];

      case "volume":
        return [
          {
            timeframe: "24H",
            bitcoin: Number((btcData.MOVING_24_HOUR_VOLUME / 1000).toFixed(1)),
            ethereum: Number((ethData.MOVING_24_HOUR_VOLUME / 1000).toFixed(1)),
          },
          {
            timeframe: "7D",
            bitcoin: Number((btcData.MOVING_7_DAY_VOLUME / 1000).toFixed(1)),
            ethereum: Number((ethData.MOVING_7_DAY_VOLUME / 1000).toFixed(1)),
          },
          {
            timeframe: "30D",
            bitcoin: Number((btcData.MOVING_30_DAY_VOLUME / 1000).toFixed(1)),
            ethereum: Number((ethData.MOVING_30_DAY_VOLUME / 1000).toFixed(1)),
          },
        ];

      case "volatility":
        const btcHourlyVolatility =
          ((btcData.CURRENT_HOUR_HIGH - btcData.CURRENT_HOUR_LOW) /
            btcData.VALUE) *
          100;
        const ethHourlyVolatility =
          ((ethData.CURRENT_HOUR_HIGH - ethData.CURRENT_HOUR_LOW) /
            ethData.VALUE) *
          100;
        const btcDailyVolatility =
          ((btcData.CURRENT_DAY_HIGH - btcData.CURRENT_DAY_LOW) /
            btcData.VALUE) *
          100;
        const ethDailyVolatility =
          ((ethData.CURRENT_DAY_HIGH - ethData.CURRENT_DAY_LOW) /
            ethData.VALUE) *
          100;
        const btcWeeklyVolatility =
          ((btcData.CURRENT_WEEK_HIGH - btcData.CURRENT_WEEK_LOW) /
            btcData.VALUE) *
          100;
        const ethWeeklyVolatility =
          ((ethData.CURRENT_WEEK_HIGH - ethData.CURRENT_WEEK_LOW) /
            ethData.VALUE) *
          100;

        return [
          {
            timeframe: "Hourly",
            bitcoin: Number(btcHourlyVolatility.toFixed(2)),
            ethereum: Number(ethHourlyVolatility.toFixed(2)),
          },
          {
            timeframe: "Daily",
            bitcoin: Number(btcDailyVolatility.toFixed(2)),
            ethereum: Number(ethDailyVolatility.toFixed(2)),
          },
          {
            timeframe: "Weekly",
            bitcoin: Number(btcWeeklyVolatility.toFixed(2)),
            ethereum: Number(ethWeeklyVolatility.toFixed(2)),
          },
        ];

      default:
        return [];
    }
  }, [cryptoData, chartType]);

  const getChartInfo = () => {
    switch (chartType) {
      case "performance":
        return {
          title: "Cryptocurrency Performance Analysis",
          description: "Price change percentages across different timeframes",
          unit: "%",
        };
      case "volume":
        return {
          title: "Trading Volume Comparison",
          description: "Trading volume (in thousands) across timeframes",
          unit: "K",
        };
      case "volatility":
        return {
          title: "Price Volatility Analysis",
          description: "Price volatility percentages across different periods",
          unit: "%",
        };
    }
  };

  const chartInfo = getChartInfo();

  return (
    <Card className="pt-0 md:col-span-2">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{chartInfo.title}</CardTitle>
          <CardDescription>{chartInfo.description}</CardDescription>
        </div>
        <Select
          value={chartType}
          onValueChange={(value) => setChartType(value as ChartType)}
        >
          <SelectTrigger
            className="hidden w-[180px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select chart type"
          >
            <SelectValue placeholder="Performance" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="performance" className="rounded-lg">
              Performance %
            </SelectItem>
            <SelectItem value="volume" className="rounded-lg">
              Trading Volume
            </SelectItem>
            <SelectItem value="volatility" className="rounded-lg">
              Volatility Analysis
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-center text-gray-500">Loading crypto data...</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="fillBitcoin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f7931a" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f7931a" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillEthereum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#627eea" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#627eea" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="timeframe"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}${chartInfo.unit}`}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => `${value} Period`}
                    formatter={(value, name) => [
                      `${value}${chartInfo.unit}`,
                      name === "bitcoin" ? "Bitcoin (BTC)" : "Ethereum (ETH)",
                    ]}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="ethereum"
                type="monotone"
                fill="url(#fillEthereum)"
                stroke="#627eea"
                strokeWidth={2}
                fillOpacity={0.6}
              />
              <Area
                dataKey="bitcoin"
                type="monotone"
                fill="url(#fillBitcoin)"
                stroke="#f7931a"
                strokeWidth={2}
                fillOpacity={0.6}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}

        {cryptoData && (
          <div className="flex items-center justify-between gap-4 space-y-0 sm:flex-row">
            <div className="space-y-1">
              <p className="font-medium text-blue-600">Ethereum (ETH)</p>
              <p className="text-2xl font-bold">
                ${cryptoData["ETH-USD"].VALUE.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-orange-600">Bitcoin (BTC)</p>
              <p className="text-2xl font-bold">
                ${cryptoData["BTC-USD"].VALUE.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
