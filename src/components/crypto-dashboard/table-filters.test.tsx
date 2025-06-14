import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import TableFilters from "./table-filters";

describe("TableFilters", () => {
    const mockSetSearch = jest.fn();
    const mockSetSort = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders search input and sort select", () => {
        render(
            <TableFilters
                search=""
                setSearch={mockSetSearch}
                sort="market_cap_desc"
                setSort={mockSetSort}
            />
        );

        expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
        expect(screen.getByText("Market Cap (High to Low)")).toBeInTheDocument();
    });

    it("handles sort change", () => {
        render(
            <TableFilters
                search=""
                setSearch={mockSetSearch}
                sort="market_cap_desc"
                setSort={mockSetSort}
            />
        );

        const sortSelect = screen.getByText("Market Cap (High to Low)");
        fireEvent.click(sortSelect);

        const volumeOption = screen.getByText("Volume (High to Low)");
        fireEvent.click(volumeOption);

        expect(mockSetSort).toHaveBeenCalledWith("volume_desc");
    });

    it("maintains selected sort value", () => {
        render(
            <TableFilters
                search=""
                setSearch={mockSetSearch}
                sort="volume_asc"
                setSort={mockSetSort}
            />
        );

        expect(screen.getByText("Volume (Low to High)")).toBeInTheDocument();
    });
});
