import { useQuery } from "@tanstack/react-query";
import { COIN_GECKO_API_URL } from "./constants";

export interface ICoins {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: null | {
        times: number;
        currency: string;
        percentage: number;
    };
    last_updated: string;
}

export interface IuseListCoinsParams {
    /** Target currency of coins and market data (required) */
    vs_currency: string;
    /** Sort result by field */
    order?: 'market_cap_desc' | 'market_cap_asc' | 'volume_desc' | 'volume_asc' | 'id_desc' | 'id_asc';
    /** Total results per page (1-250) */
    per_page?: number;
    /** Page through results */
    page?: number;
    /** Include sparkline 7 days data */
    sparkline?: boolean;
    /** Coins' IDs, comma-separated if querying more than 1 coin */
    ids?: string;
    /** Coins' names, comma-separated if querying more than 1 coin */
    names?: string;
    /** Coins' symbols, comma-separated if querying more than 1 coin */
    symbols?: string;
    /** For symbols lookups, specify all to include all matching tokens */
    include_tokens?: 'all' | 'top';
    /** Filter based on coins' category */
    category?: string;
    /** Include price change percentage timeframe (1h, 24h, 7d, 14d, 30d, 200d, 1y) */
    price_change_percentage?: string;
    /** Language background */
    locale?: string;
    /** Decimal place for currency price value */
    precision?: string;
}

const fetchListCoins = async (params: IuseListCoinsParams): Promise<ICoins[]> => {
    try {
        const url = new URL(COIN_GECKO_API_URL + "/coins/markets");
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        const response = await fetch(url.toString());
        const data = await response.json();

        if (data.status?.error_code === 429) throw new Error("Rate limit exceeded");

        return data as ICoins[];
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching coins");
    }
}

const useListCoins = (params: IuseListCoinsParams, initialData?: ICoins[]) => {
    "use client"
    return useQuery({
        queryKey: ["list-coins", params],
        queryFn: () => fetchListCoins(params),
        initialData
    })
}
export { fetchListCoins, useListCoins };