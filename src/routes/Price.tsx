import { useQuery } from "react-query";
import { fetchCoinPrice } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";
import styled from "styled-components";
import { useState } from "react";

const PricesSpace = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const PriceSpace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    margin-bottom: 5px;
  }
`;

interface IPrice {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IPrice[]>(["price", coinId], () =>
    fetchCoinPrice(coinId)
  );

  const len = 21;
  const exceptData = data ?? [];
  const priceData = exceptData?.map((i) => {
    return i.close;
  });

  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <>
          <PricesSpace>
            <PriceSpace>
              <span>1일 전 가격</span>
              <span>${priceData[len - 2]}</span>
            </PriceSpace>
            <PriceSpace>
              <span>2일 전 가격</span>
              <span>${priceData[len - 2]}</span>
            </PriceSpace>
            <PriceSpace>
              <span>7일 전 가격</span>
              <span>${priceData[len - 8]}</span>
            </PriceSpace>
            <PriceSpace>
              <span>14일 전 가격</span>
              <span>${priceData[len - 15]}</span>
            </PriceSpace>
            <PriceSpace>
              <span>21일 전 가격</span>
              <span>${priceData[0]}</span>
            </PriceSpace>
          </PricesSpace>
        </>
      )}
    </div>
  );
}

export default Price;
