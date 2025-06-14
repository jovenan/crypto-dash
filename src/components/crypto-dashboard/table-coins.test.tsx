import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import TableCoins from "./table-coins";
import { ICoins } from "@/services/list-coins";

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn()
    })
}));

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />
}));

const mockCoins: ICoins[] = [
    {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        market_cap_rank: 1,
        current_price: 50000,
        price_change_percentage_24h: 2.5,
        high_24h: 51000,
        low_24h: 49000,
        market_cap: 1000000000000,
        total_volume: 50000000000,
        fully_diluted_valuation: 1000000000000,
        price_change_24h: 1000,
        market_cap_change_24h: 10000000000,
        market_cap_change_percentage_24h: 1.5,
        circulating_supply: 19000000,
        total_supply: 21000000,
        max_supply: 21000000,
        ath: 69000,
        ath_change_percentage: -27.5,
        ath_date: "2021-11-10T14:24:11.849Z",
        atl: 67.81,
        atl_change_percentage: 73630.49,
        atl_date: "2013-07-06T00:00:00.000Z",
        last_updated: "2024-03-01T00:00:00.000Z",
        roi: {
            times: 1.5,
            currency: "usd",
            percentage: 150
        }
    },
    {
        id: "ethereum",
        name: "Ethereum",
        symbol: "eth",
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
        market_cap_rank: 2,
        current_price: 3000,
        price_change_percentage_24h: -1.5,
        high_24h: 3100,
        low_24h: 2900,
        market_cap: 500000000000,
        total_volume: 25000000000,
        fully_diluted_valuation: 500000000000,
        price_change_24h: -50,
        market_cap_change_24h: -5000000000,
        market_cap_change_percentage_24h: -1.0,
        circulating_supply: 120000000,
        total_supply: 120000000,
        max_supply: 0,
        ath: 4865,
        ath_change_percentage: -38.3,
        ath_date: "2021-11-10T14:24:11.849Z",
        atl: 0.432979,
        atl_change_percentage: 692830.49,
        atl_date: "2015-10-20T00:00:00.000Z",
        last_updated: "2024-03-01T00:00:00.000Z",
        roi: {
            times: 1.2,
            currency: "usd",
            percentage: 120
        }
    }
];

describe("TableCoins", () => {
    it("renders loading state", () => {
        render(<TableCoins coins={[]} isLoading={true} isError={false} />);

        expect(screen.getByTestId("loading-table")).toBeInTheDocument();
    });

    it("renders error state", () => {
        render(<TableCoins coins={[]} isLoading={false} isError={true} />);

        expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
        expect(screen.getByText(/please try again later/i)).toBeInTheDocument();
    });

    it("renders table with data", () => {
        render(<TableCoins coins={mockCoins} isLoading={false} isError={false} />);

        expect(screen.getByText("Rank")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Price")).toBeInTheDocument();
        expect(screen.getByText("24h %")).toBeInTheDocument();
        expect(screen.getByText("24h High")).toBeInTheDocument();
        expect(screen.getByText("24h Low")).toBeInTheDocument();
        expect(screen.getByText("Market Cap")).toBeInTheDocument();
        expect(screen.getByText("Volume")).toBeInTheDocument();

        expect(screen.getByText("Bitcoin")).toBeInTheDocument();
        expect(screen.getByText("Ethereum")).toBeInTheDocument();
        expect(screen.getByText("btc")).toBeInTheDocument();
        expect(screen.getByText("eth")).toBeInTheDocument();
        expect(screen.getByText("#1")).toBeInTheDocument();
        expect(screen.getByText("#2")).toBeInTheDocument();
    });

    it("renders formatted currency values", () => {
        render(<TableCoins coins={mockCoins} isLoading={false} isError={false} />);

        expect(screen.getByText("$50,000.00")).toBeInTheDocument();
        expect(screen.getByText("$3,000.00")).toBeInTheDocument();
        expect(screen.getByText("$51,000.00")).toBeInTheDocument();
        expect(screen.getByText("$49,000.00")).toBeInTheDocument();
    });
});
