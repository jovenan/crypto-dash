import { useQuery } from "@tanstack/react-query";
import { COIN_GECKO_API_URL } from "./constants";

export interface ICoinChart {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

export interface IuseCoinChartParams {
    /** Target currency of market data (required) */
    vs_currency: string;
    /** Data up to number of days ago (required) */
    days: string;
}

const fetchCoinChart = async (id: string, params: IuseCoinChartParams): Promise<ICoinChart> => {
    try {
        const url = new URL(COIN_GECKO_API_URL + "/coins/" + id + "/market_chart");
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        const response = await fetch(url.toString());
        const data = await response.json();
        if (data.status?.error_code === 429) throw new Error("Rate limit exceeded");

        return data as ICoinChart;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching coin chart");
    }
}

const useCoinChart = (id: string, params: IuseCoinChartParams, initialData?: ICoinChart) => {
    "use client"
    return useQuery({
        queryKey: ["coin-chart", id, params],
        queryFn: () => fetchCoinChart(id, params),
        initialData
    })
}
export { useCoinChart, fetchCoinChart };