"use client"
import { ICoins, IGetListCoinsParams } from "@/services/list-coins";
import { getListCoins } from "@/services/list-coins";
import { useState } from "react";
import TableCoins from "./table-coins";
import TableFilters from "./table-filters";
import TablePagination from "./table-pagination";

export default function Dashboard({ initialData }: { initialData: ICoins[] }) {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<IGetListCoinsParams["order"]>("market_cap_desc");
    const [page, setPage] = useState(1);
    const perPage = 20;

    const { data: coins = [], isLoading, isError } = getListCoins({
        vs_currency: "usd",
        names: search,
        order: sort,
        per_page: perPage,
        page: page,
    }, initialData);

    return (
        <div className="p-4 max-w-7xl mx-auto flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Crypto Dashboard</h1>
            <TableFilters search={search} setSearch={setSearch} sort={sort} setSort={setSort} />
            <TableCoins coins={coins} isLoading={isLoading} isError={isError} />
            <TablePagination page={page} setPage={setPage} coins={coins} perPage={perPage} />
        </div>
    );
}
