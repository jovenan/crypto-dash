"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { getCoinChart } from "@/services/get-coin-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

interface ChartProps {
    coinId: string;
    vsCurrency: string;
    days: string;
    config: ChartConfig;
}

function formatXAxisLabel(timestamp: number) {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}`;
}

export default function Chart({ coinId, vsCurrency, days, config }: ChartProps) {
    const { data, isLoading, isError } = getCoinChart(coinId, { vs_currency: vsCurrency, days });

    if (isLoading) {
        return <Skeleton data-testid="chart-skeleton" className="h-[350px] w-full rounded-xl" />;
    }

    if (isError || !data) {
        return (
            <div data-testid="chart-error" className="h-[350px] w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-red-500">
                <AlertCircle className="w-8 h-8 mb-2" />
                <span>Error loading chart data</span>
            </div>
        );
    }

    const chartData = data.prices.map(([timestamp, price]) => ({
        timestamp,
        price,
    }));

    return (
        <ChartContainer config={config} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData} data-testid="line-chart">
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatXAxisLabel}
                        minTickGap={20}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        dataKey="price"
                        tickFormatter={(v) => `$${v.toLocaleString()}`}
                        width={80}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                        formatter={(value: number) => `$${value.toLocaleString()}`}
                        labelFormatter={(label) => {
                            const date = new Date(label);
                            return date.toLocaleString();
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke={config.prices?.color || "#2563eb"}
                        dot={false}
                        strokeWidth={2}
                        name={String(config.prices?.label || "Price")}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}