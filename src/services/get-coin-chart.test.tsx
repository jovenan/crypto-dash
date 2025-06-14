import '@testing-library/jest-dom'
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";
import { COIN_GECKO_API_URL } from './constants';
import { fetchCoinChart, useCoinChart } from "./get-coin-chart";


const mockChartData = {
    prices: [
        [1718323200000, 100],
        [1718409600000, 110],
    ],
    market_caps: [
        [1718323200000, 200],
        [1718409600000, 210],
    ],
    total_volumes: [
        [1718323200000, 300],
        [1718409600000, 310],
    ],
};

describe("fetchCoinChart", () => {
    it("should fetch coin chart data", async () => {
        nock(COIN_GECKO_API_URL)
            .get("/coins/bitcoin/market_chart")
            .query(true)
            .reply(200, mockChartData);

        const chartData = await fetchCoinChart("bitcoin", { vs_currency: "usd", days: "7" });
        expect(chartData).toEqual(mockChartData);
    });
});

describe("useCoinChart", () => {
    it("should fetch and return coin chart data", async () => {
        const queryClient = new QueryClient();

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

        nock(COIN_GECKO_API_URL)
            .get("/coins/bitcoin/market_chart")
            .query(true)
            .reply(200, mockChartData);

        const { result } = renderHook(
            () => useCoinChart("bitcoin", { vs_currency: "usd", days: "7" }),
            { wrapper }
        );

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockChartData);
    });
});

