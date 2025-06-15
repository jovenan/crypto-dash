"use client"
import { ICoins, IuseListCoinsParams } from "@/services/list-coins";
import { useListCoins } from "@/services/list-coins";
import { Suspense, useState } from "react";
import TableCoins from "./table-coins";
import TableFilters from "./table-filters";
import TablePagination from "./table-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

export default function Dashboard({ initialData }: { initialData: ICoins[] }) {
    return (
        <ErrorBoundary fallbackRender={() => <ErrorDashboard />}>
            <Suspense fallback={<LoadingDashboard />}>
                <DashboardLayout initialData={initialData} />
            </Suspense>
        </ErrorBoundary>
    )
}

function DashboardLayout({ initialData }: { initialData: ICoins[] }) {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<IuseListCoinsParams["order"]>("market_cap_desc");
    const [page, setPage] = useState(1);
    const perPage = 20;

    const { data: coins = [], isLoading, isError } = useListCoins({
        vs_currency: "usd",
        names: search,
        order: sort,
        per_page: perPage,
        page: page,
    }, initialData);

    if (isLoading) return <LoadingDashboard />;
    if (isError) return <ErrorDashboard />;

    return (
        <div className="p-4 max-w-7xl mx-auto flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Crypto Dashboard</h1>
            <TableFilters search={search} setSearch={setSearch} sort={sort} setSort={setSort} />
            <TableCoins coins={coins} />
            <TablePagination page={page} setPage={setPage} coins={coins} perPage={perPage} />
        </div>
    );
}

export function LoadingDashboard() {
    return (
        <div className="p-4 max-w-7xl mx-auto flex flex-col gap-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-4">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-40" />
            </div>
            <div className="border-2 border-gray-200 rounded-xl h-[600px] flex flex-col">
                <div className="border-b p-4">
                    <div className="flex gap-4">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <div className="flex-1 p-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="flex gap-4 mb-4">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
            </div>
        </div>
    );
}

export function ErrorDashboard() {
    return (
        <div className="p-4 max-w-7xl mx-auto flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Crypto Dashboard</h1>
            <div className="border-2 border-gray-200 rounded-xl h-[600px] flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center text-muted-foreground">
                        <AlertCircle className="h-8 w-8 mb-2" />
                        <p className="text-sm">Failed to load data</p>
                        <p className="text-xs">Please try again later</p>
                    </div>
                </div>
            </div>
        </div>
    );
}