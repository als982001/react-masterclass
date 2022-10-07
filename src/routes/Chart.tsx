import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";
import { useEffect, useState } from "react";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface IPriceInfo {
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const exceptData = data ?? [];
  const chartData = exceptData?.map((i) => {
    return {
      x: i.time_close,
      y: [i.open, i.high, i.low, i.close],
    };
  });

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => Number(price.close)) as number[],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 500,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              stroke: {
                curve: "smooth",
                width: 5,
              },
              yaxis: { show: false },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                categories: data?.map((price) => price.time_close),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] }, // 그래프 처음 색깔
              },
              colors: ["#0fbcf9"], // 그래프 끝 색깔
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
          <ApexChart
            type="candlestick"
            series={[
              {
                data: chartData,
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 500,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              yaxis: { show: false },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                categories: data?.map((price) => price.time_close),
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default Chart;
