"use client"

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import { ThemeProvider as NextThemesProvider } from "next-themes"

const queryClient = new QueryClient({});

export default function Context({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ThemeProvider>
    )
}

function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}