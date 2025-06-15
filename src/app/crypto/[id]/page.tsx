import Details, { DetailsError, DetailsLoading } from "@/components/crypto-details/details";
import { fetchCoinDetails } from "@/services/get-coin";
import { Suspense } from "react";

export default async function CryptoPage({ params }: {
    params: Promise<{ id: string }>
}) {
    try {
        const { id } = await params;
        const coin = await fetchCoinDetails(id);
        return (
            <Suspense fallback={<DetailsLoading />}>
                <Details initialData={coin} />
            </Suspense>
        );
    } catch (error) {
        console.error(error);
        return <DetailsError />;
    }
}