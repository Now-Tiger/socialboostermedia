import { ChartConfig } from "@/components/ui/chart";

export type ChartType = "performance" | "volume" | "volatility";

export interface CryptoData {
  VALUE: number;
  MOVING_24_HOUR_CHANGE_PERCENTAGE: number;
  MOVING_7_DAY_CHANGE_PERCENTAGE: number;
  MOVING_30_DAY_CHANGE_PERCENTAGE: number;
  MOVING_90_DAY_CHANGE_PERCENTAGE: number;
  CURRENT_YEAR_CHANGE_PERCENTAGE: number;
  MOVING_24_HOUR_VOLUME: number;
  MOVING_7_DAY_VOLUME: number;
  MOVING_30_DAY_VOLUME: number;
  CURRENT_HOUR_HIGH: number;
  CURRENT_HOUR_LOW: number;
  CURRENT_DAY_HIGH: number;
  CURRENT_DAY_LOW: number;
  CURRENT_WEEK_HIGH: number;
  CURRENT_WEEK_LOW: number;
}

export interface ApiResponse {
  Data: {
    "BTC-USD": CryptoData;
    "ETH-USD": CryptoData;
  };
  Err: { type: ""; description: ""; parameters: Map<string, object> };
}

export const chartConfig = {
  performance: { label: "Performance" },
  bitcoin: { label: "Bitcoin (BTC)", color: "#f7931a" },
  ethereum: { label: "Ethereum (ETH)", color: "#627eea" },
} satisfies ChartConfig;

// const publicBitCoinBaseUrl = "https://data-api.coindesk.com/index/cc/v1/latest/tick";
export const localDjangoBackendUrl = 'http://localhost:8000/crypto-market-data/'

const bitcoinUrl = process.env.publicBitCoinBaseUrl ?? process.env.djangoBackendUrl + 'crypto-market-data/'

const params = {
  market: "cadli",
  instruments: "BTC-USD,ETH-USD",
  apply_mapping: "true",
};

export const publicBitCoinUrl = new URL(bitcoinUrl);

publicBitCoinUrl.search = new URLSearchParams(params).toString();

export const options = {
  method: "GET",
  headers: { "Content-type": "application/json; charset=UTF-8" },
};
