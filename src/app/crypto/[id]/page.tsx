import Details from "@/components/crypto-details/details";
import { fetchCoinDetails } from "@/services/get-coin";

type Props = {
    params: {
        id: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CryptoPage({ params }: Props) {
    const { id } = params;
    const coin = await fetchCoinDetails(id);
    return <Details initialData={coin} />;
}