"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, cn, formatPercentage } from "@/lib/utils";
import { ICoins } from "@/services/list-coins"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, TrendingUp, TrendingDown } from "lucide-react"
import { useRouter } from 'next/navigation'

const COLS = [
    { label: "Rank", className: "w-[80px] text-right" },
    { label: "Name", className: "w-[250px] min-w-0" },
    { label: "Price", className: "w-[120px] text-right" },
    { label: "24h %", className: "w-[120px] text-right" },
    { label: "24h High", className: "w-[120px] text-right" },
    { label: "24h Low", className: "w-[120px] text-right" },
    { label: "Market Cap", className: "w-[150px] text-right" },
    { label: "Volume", className: "w-[160px] text-right" },
];

function LoadingTable() {
    return (
        <div data-testid="loading-table" className="border-2 border-gray-200 rounded-xl h-[600px] flex flex-col">
            <div className="border-b">
                <Table>
                    <TableHeader>
                        <TableRow className="mr-4">
                            {COLS.map(col => (
                                <TableHead key={col.label} className={col.className}>{col.label}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                </Table>
            </div>
            <div className="flex-1 overflow-auto">
                <Table>
                    <TableBody>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className="w-[80px] text-right"><Skeleton className="h-4 w-8" /></TableCell>
                                <TableCell className="w-[250px] min-w-0"><div className="flex items-center gap-2"><Skeleton className="h-5 w-5 rounded-full" /><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-16" /></div></TableCell>
                                <TableCell className="w-[120px] text-right"><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell className="w-[120px] text-right"><Skeleton className="h-4 w-16" /></TableCell>
                                <TableCell className="w-[120px] text-right"><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell className="w-[120px] text-right"><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell className="w-[150px] text-right"><Skeleton className="h-4 w-32" /></TableCell>
                                <TableCell className="w-[120px] text-right"><Skeleton className="h-4 w-24" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function ErrorTable() {
    return (
        <div className="border-2 border-gray-200 rounded-xl h-[600px] flex flex-col">
            <div className="border-b">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {COLS.map(col => (
                                <TableHead key={col.label} className={col.className}>{col.label}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                </Table>
            </div>
            <div className="flex-1 overflow-auto">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={8} className="h-[400px]">
                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                    <AlertCircle className="h-8 w-8 mb-2" />
                                    <p className="text-sm">Failed to load data</p>
                                    <p className="text-xs">Please try again later</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default function TableCoins({ coins, isLoading, isError }: { coins: ICoins[], isLoading: boolean, isError: boolean }) {
    const router = useRouter();

    if (isLoading) return <LoadingTable />;
    if (isError) return <ErrorTable />;

    return (
        <div className="space-y-4">
            <div className="border-2 border-gray-200 rounded-xl h-[550px] flex flex-col">
                <div className="border-b">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {COLS.map(col => (
                                    <TableHead key={col.label} className={col.className}>{col.label}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                    </Table>
                </div>
                <div className="flex-1 overflow-auto">
                    <Table>
                        <TableBody>
                            {coins.map((coin) => (
                                <TableRow key={coin.id} className="cursor-pointer" onClick={() => router.push(`/crypto/${coin.id}`)}>
                                    <TableCell className="w-[80px] text-right">#{coin.market_cap_rank}</TableCell>
                                    <TableCell className="w-[250px] min-w-0">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <Image src={coin.image} alt={coin.name} width={20} height={20} />
                                            <span className="font-medium truncate max-w-[120px]">{coin.name}</span>
                                            <span className="text-xs text-gray-500 truncate max-w-[40px]">{coin.symbol}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="w-[120px] text-right">{formatCurrency(coin.current_price)}</TableCell>
                                    <TableCell className={cn(
                                        "w-[120px] text-right",
                                        coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"
                                    )}>
                                        <div className="flex items-center gap-1 justify-end">
                                            {coin.price_change_percentage_24h > 0 ? (
                                                <TrendingUp className="h-4 w-4" />
                                            ) : (
                                                <TrendingDown className="h-4 w-4" />
                                            )}
                                            {formatPercentage(coin.price_change_percentage_24h)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="w-[120px] text-right">{formatCurrency(coin.high_24h)}</TableCell>
                                    <TableCell className="w-[120px] text-right">{formatCurrency(coin.low_24h)}</TableCell>
                                    <TableCell className="w-[150px] text-right">{formatCurrency(coin.market_cap)}</TableCell>
                                    <TableCell className="w-[120px] text-right">{formatCurrency(coin.total_volume)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}