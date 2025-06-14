import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center p-18">
            <div className="flex flex-col items-center gap-8 text-center">
                <div className="relative w-[350px] h-[350px]">
                    <Image
                        src="/avatar.webp"
                        alt="Crypto Mascot"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <div className="space-y-4 max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Crypto Dashboard
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Explore the world of cryptocurrencies with our interactive dashboard.
                        Track real-time prices, visualize market trends, and make informed
                        investment decisions.
                    </p>
                </div>

                <Button asChild size="lg" className="mt-4">
                    <Link href="/dashboard">
                        Explore Dashboard
                    </Link>
                </Button>
            </div>
        </main>
    )
}