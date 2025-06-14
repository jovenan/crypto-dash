"use client"
import { ICoinDetails, getCoinDetails } from "@/services/get-coin";
import Image from "next/image";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Chart from "./chart";

export default function Details({ initialData }: { initialData: ICoinDetails }) {
    const { data: coinDetails, isLoading, isError } = getCoinDetails(initialData.id, initialData);

    if (isLoading) return <DetailsLoadingPlaceholder />;
    if (isError || !coinDetails) return <DetailsError />;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <Breadcrumb className="mb-4" data-testid="breadcrumb">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{coinDetails.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-4">
                <Image src={coinDetails.image?.large || ""} alt={coinDetails.name} width={48} height={48} />
                <div>
                    <h1 data-testid="coin-name" className="text-3xl font-bold">{coinDetails.name} <span className="uppercase text-gray-500 text-lg">{coinDetails.symbol}</span></h1>
                    <div className="text-muted-foreground text-sm">Rank #{coinDetails.market_cap_rank}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                    <div className="text-gray-500 text-xs">Current Price</div>
                    <div className="text-xl font-semibold">{formatCurrency(coinDetails.market_data?.current_price?.usd || 0)}</div>
                </div>
                <div>
                    <div className="text-gray-500 text-xs">24h Change</div>
                    <div className={coinDetails.market_data?.price_change_percentage_24h > 0 ? "text-green-600" : "text-red-500"}>
                        {formatPercentage(coinDetails.market_data?.price_change_percentage_24h || 0)}
                    </div>
                </div>
                <div>
                    <div className="text-gray-500 text-xs">Market Cap</div>
                    <div>{formatCurrency(coinDetails.market_data?.market_cap?.usd || 0)}</div>
                </div>
                <div>
                    <div className="text-gray-500 text-xs">24h High</div>
                    <div>{formatCurrency(coinDetails.market_data?.high_24h?.usd || 0)}</div>
                </div>
                <div>
                    <div className="text-gray-500 text-xs">24h Low</div>
                    <div>{formatCurrency(coinDetails.market_data?.low_24h?.usd || 0)}</div>
                </div>
                <div>
                    <div className="text-gray-500 text-xs">Volume (24h)</div>
                    <div>{formatCurrency(coinDetails.market_data?.total_volume?.usd || 0)}</div>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Price History (Line Chart)</h2>
            <Chart coinId={coinDetails.id} vsCurrency="usd" days="30" config={{}} />

            <div>
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: coinDetails.description?.en || "No description available." }} />
            </div>
        </div>
    );
}

export function DetailsLoadingPlaceholder() {
    return (
        <div data-testid="details-loading-placeholder" className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-7 w-40" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>

            {/* Price and stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>

            {/* Chart placeholder */}
            <Skeleton className="h-[350px] w-full rounded-xl" />

            {/* Description */}
            <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-20 w-full" />
            </div>
        </div>
    );
}

export function DetailsError() {
    return (
        <div className="max-w-4xl mx-auto p-8 flex flex-col items-center text-center text-red-500">
            <AlertCircle className="w-10 h-10 mb-2" />
            <div className="text-lg font-semibold">Error loading details</div>
            <div className="text-sm text-muted-foreground">Please try again later.</div>
        </div>
    );
}