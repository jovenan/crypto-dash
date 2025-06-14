import Dashboard from "@/components/crypto-dashboard/dashboard";
import { fetchListCoins } from "@/services/list-coins";

export default async function Home() {
  const initialData = await fetchListCoins({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: 20,
    page: 1,
  })
  return (
    <Dashboard initialData={initialData} />
  )
}