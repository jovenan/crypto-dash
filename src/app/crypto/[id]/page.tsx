import Details from "@/components/crypto-details/details";
import { fetchCoinDetails } from "@/services/get-coin";

export default async function CryptoPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const coin = await fetchCoinDetails(id);
    return <Details initialData={coin} />;
}