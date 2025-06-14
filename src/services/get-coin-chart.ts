import { useQuery } from "@tanstack/react-query";
import { COIN_GECKO_API_URL } from "./constants";

export interface ICoinChart {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

export interface IGetCoinChartParams {
    /** Target currency of market data (required) */
    vs_currency: string;
    /** Data up to number of days ago (required) */
    days: string;
}

const fetchCoinChart = async (id: string, params: IGetCoinChartParams): Promise<ICoinChart> => {
    try {
        const url = new URL(COIN_GECKO_API_URL + "/coins/" + id + "/market_chart");
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        const response = await fetch(url.toString());
        const data = await response.json();
        return data as ICoinChart;
    } catch (error) {
        console.error(error);
        return {} as ICoinChart;
    }
}

const getCoinChart = (id: string, params: IGetCoinChartParams, initialData?: ICoinChart) => {
    "use client"
    return useQuery({
        queryKey: ["coin-chart", id, params],
        queryFn: () => fetchCoinChart(id, params),
        initialData
    })
}
export { getCoinChart, fetchCoinChart };