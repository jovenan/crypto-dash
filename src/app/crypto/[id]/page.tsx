import Details from "@/components/crypto-details/details";
import { fetchCoinDetails } from "@/services/get-coin";

export default async function CryptoPage({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const coin = await fetchCoinDetails(id);
    return <Details initialData={coin} />;
}