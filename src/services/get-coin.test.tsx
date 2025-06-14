import '@testing-library/jest-dom'
import { fetchCoinDetails, useCoinDetails } from "./get-coin";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";
import { COIN_GECKO_API_URL } from './constants';

describe("fetchCoinDetails", () => {
    it("should fetch coin details", async () => {
        nock(COIN_GECKO_API_URL)
            .persist()
            .get("/coins/bitcoin")
            .query(true)
            .reply(200, { id: "bitcoin", name: "Bitcoin" });

        const coinDetails = await fetchCoinDetails("bitcoin");
        expect(coinDetails).toBeDefined();
        expect(coinDetails.id).toBe("bitcoin");
        expect(coinDetails.name).toBe("Bitcoin");
    })
})

describe("useCoinDetails", () => {
    it("should fetch and return coin details", async () => {
        const queryClient = new QueryClient();

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

        nock(COIN_GECKO_API_URL)
            .persist()
            .get("/coins/bitcoin")
            .query(true)
            .reply(200, { id: "bitcoin", name: "Bitcoin" });

        const { result } = renderHook(() => useCoinDetails("bitcoin"), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual({ id: "bitcoin", name: "Bitcoin" });
    });
});

