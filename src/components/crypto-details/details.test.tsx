import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import * as getCoinModule from "../../services/get-coin";
import Details, { DetailsLoadingPlaceholder, DetailsError } from "./details";

jest.mock("./chart", () => () => <div data-testid="chart-mock">ChartMock</div>);

jest.mock("../../services/get-coin", () => ({
    getCoinDetails: jest.fn()
}));

const mockCoinDetails = {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    image: { large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
    market_cap_rank: 1,
    market_data: {
        current_price: { usd: 100 },
        price_change_percentage_24h: 2,
        market_cap: { usd: 1000 },
        high_24h: { usd: 110 },
        low_24h: { usd: 90 },
        total_volume: { usd: 500 },
    },
    description: { en: "Bitcoin is a cryptocurrency." }
};

afterEach(() => {
    jest.clearAllMocks();
});

describe("Details", () => {
    it("renders loading placeholder", () => {
        (getCoinModule.getCoinDetails as jest.Mock).mockReturnValue({
            data: undefined,
            isLoading: true,
            isError: false,
        });

        render(<Details initialData={mockCoinDetails as any} />);
        expect(screen.getByTestId("details-loading-placeholder")).toBeInTheDocument();
    });

    it("renders error state", () => {
        (getCoinModule.getCoinDetails as jest.Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
        });

        render(<Details initialData={mockCoinDetails as any} />);
        expect(screen.getByText(/error loading details/i)).toBeInTheDocument();
    });

    it("renders coin details", () => {
        (getCoinModule.getCoinDetails as jest.Mock).mockReturnValue({
            data: mockCoinDetails,
            isLoading: false,
            isError: false,
        });

        render(<Details initialData={mockCoinDetails as any} />);
        expect(screen.getByTestId("coin-name")).toBeInTheDocument();
    });

    it("renders breadcrumb", () => {
        (getCoinModule.getCoinDetails as jest.Mock).mockReturnValue({
            data: mockCoinDetails,
            isLoading: false,
            isError: false,
        });

        render(<Details initialData={mockCoinDetails as any} />);
        expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
    });
});

describe("DetailsLoadingPlaceholder", () => {
    it("renders skeletons", () => {
        render(<DetailsLoadingPlaceholder />);
        expect(screen.getByTestId("details-loading-placeholder")).toBeInTheDocument();
    });
});

describe("DetailsError", () => {
    it("renders error message", () => {
        render(<DetailsError />);
        expect(screen.getByText(/error loading details/i)).toBeInTheDocument();
        expect(screen.getByText(/please try again later/i)).toBeInTheDocument();
    });
});
