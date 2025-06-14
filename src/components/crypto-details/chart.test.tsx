import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import * as getCoinChartModule from "../../services/get-coin-chart";
import Chart from "./chart";

class ResizeObserverMock {
    observe() { }
    unobserve() { }
    disconnect() { }
}

global.ResizeObserver = ResizeObserverMock;

jest.mock("recharts", () => ({
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="responsive-container">{children}</div>
    ),
    LineChart: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="line-chart">{children}</div>
    ),
    Line: () => <div data-testid="line" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    Tooltip: () => <div data-testid="tooltip" />
}));

jest.mock("../../services/get-coin-chart", () => ({
    getCoinChart: jest.fn()
}));

const mockChartData = {
    prices: [
        [1709251200000, 50000],
        [1709337600000, 51000],
        [1709424000000, 49000],
    ]
};

const mockConfig = {
    prices: {
        color: "#2563eb",
        label: "Price"
    }
};

afterEach(() => {
    jest.clearAllMocks();
});

describe("Chart", () => {
    it("renders loading state", () => {
        (getCoinChartModule.getCoinChart as jest.Mock).mockReturnValue({
            data: undefined,
            isLoading: true,
            isError: false,
        });

        render(
            <Chart
                coinId="bitcoin"
                vsCurrency="usd"
                days="7"
                config={mockConfig}
            />
        );

        expect(screen.getByTestId("chart-skeleton")).toBeInTheDocument();
    });

    it("renders error state", () => {
        (getCoinChartModule.getCoinChart as jest.Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
        });

        render(
            <Chart
                coinId="bitcoin"
                vsCurrency="usd"
                days="7"
                config={mockConfig}
            />
        );

        expect(screen.getByTestId("chart-error")).toBeInTheDocument();
    });

    it("renders chart with data", () => {
        (getCoinChartModule.getCoinChart as jest.Mock).mockReturnValue({
            data: mockChartData,
            isLoading: false,
            isError: false,
        });

        render(
            <Chart
                coinId="bitcoin"
                vsCurrency="usd"
                days="7"
                config={mockConfig}
            />
        );

        expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    });

    it("calls getCoinChart with correct parameters", () => {
        (getCoinChartModule.getCoinChart as jest.Mock).mockReturnValue({
            data: mockChartData,
            isLoading: false,
            isError: false,
        });

        render(
            <Chart
                coinId="bitcoin"
                vsCurrency="usd"
                days="7"
                config={mockConfig}
            />
        );

        expect(getCoinChartModule.getCoinChart).toHaveBeenCalledWith(
            "bitcoin",
            { vs_currency: "usd", days: "7" }
        );
    });
});
