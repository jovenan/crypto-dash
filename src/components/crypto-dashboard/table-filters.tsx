import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IuseListCoinsParams } from "@/services/list-coins"
import { debounce } from "@/lib/utils"
import { useCallback } from "react"

const sortOptions = {
    market_cap_desc: "Market Cap (High to Low)",
    market_cap_asc: "Market Cap (Low to High)",
    volume_desc: "Volume (High to Low)",
    volume_asc: "Volume (Low to High)",
    id_asc: "Name (A-Z)",
    id_desc: "Name (Z-A)"
} as const;

const debouncedSearch = debounce((value: string, setSearch: (search: string) => void) => {
    const encodedValue = encodeURIComponent(value.trim());
    setSearch(encodedValue);
}, 700);

export default function TableFilters({ search, setSearch, sort, setSort }: { search: string, setSearch: (search: string) => void, sort: IuseListCoinsParams["order"], setSort: (sort: IuseListCoinsParams["order"]) => void }) {
    const handleSearch = useCallback((value: string) => {
        debouncedSearch(value, setSearch);
    }, [setSearch]);

    return (
        <div className="flex items-center justify-between gap-4">
            <Input
                placeholder="Search"
                defaultValue={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="max-w-xs"
            />
            <Select
                value={sort}
                onValueChange={(value) => setSort(value as IuseListCoinsParams["order"])}
                defaultValue="market_cap_desc"
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(sortOptions).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}