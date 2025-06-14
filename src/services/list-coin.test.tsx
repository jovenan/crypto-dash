import '@testing-library/jest-dom'
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";
import { COIN_GECKO_API_URL } from './constants';
import { fetchListCoins, useListCoins } from "./list-coins";

const mockCoins = [
    {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        current_price: 100,
        market_cap: 1000,
        market_cap_rank: 1,
        fully_diluted_valuation: 2000,
        total_volume: 500,
        high_24h: 110,
        low_24h: 90,
        price_change_24h: 2,
        price_change_percentage_24h: 2,
        market_cap_change_24h: 10,
        market_cap_change_percentage_24h: 1,
        circulating_supply: 100,
        total_supply: 200,
        max_supply: 210,
        ath: 120,
        ath_change_percentage: -10,
        ath_date: "2021-01-01T00:00:00.000Z",
        atl: 10,
        atl_change_percentage: 900,
        atl_date: "2013-01-01T00:00:00.000Z",
        roi: null,
        last_updated: "2024-01-01T00:00:00.000Z"
    }
];

describe("fetchListCoins", () => {
    it("should fetch list of coins", async () => {
        nock(COIN_GECKO_API_URL)
            .get("/coins/markets")
            .query(true)
            .reply(200, mockCoins);

        const coins = await fetchListCoins({ vs_currency: "usd" });
        expect(coins).toEqual(mockCoins);
    });
});

describe("useListCoins", () => {
    it("should fetch and return list of coins", async () => {
        const queryClient = new QueryClient();

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient} >
                {children}
            </QueryClientProvider>
        );

        nock(COIN_GECKO_API_URL)
            .get("/coins/markets")
            .query(true)
            .reply(200, mockCoins);

        const { result } = renderHook(
            () => useListCoins({ vs_currency: "usd" }),
            { wrapper }
        );

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockCoins);
    });
});
