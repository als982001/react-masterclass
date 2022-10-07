const BASE_URL = `https://api.coinpaprika.com/v1`;
const NEW_BASE_URL = "https://ohlcv-api.nomadcoders.workers.dev?coinId=";

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now()); // 현재 시간을 초로 나타냄
  const startDate = endDate - 60 * 60 * 24 * 7 * 1; // 현재 시간에서 1주 - 1 시간에 해당하는 초를 뺌

  return fetch(
    `${NEW_BASE_URL}${coinId}&start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}

export function fetchCoinPrice(coinId: string) {
  const endDate = Date.now(); // 현재 시간을 초로 나타냄
  const startDate = endDate - 60 * 60 * 24 * 30; // 현재 시간에서 30일에 해당하는 초를 뺌

  return fetch(
    `${NEW_BASE_URL}${coinId}&start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
