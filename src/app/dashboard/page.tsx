import Dashboard, { ErrorDashboard, LoadingDashboard } from "@/components/crypto-dashboard/dashboard";
import { fetchListCoins } from "@/services/list-coins";
import { Suspense } from "react";

export default async function Home() {
  try {
    const initialData = await fetchListCoins({
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 20,
      page: 1,
    });

    return (
      <Suspense fallback={<LoadingDashboard />}>
        <Dashboard initialData={initialData} />
      </Suspense>
    )
  } catch (error) {
    return (
      <ErrorDashboard />
    );
  }
}