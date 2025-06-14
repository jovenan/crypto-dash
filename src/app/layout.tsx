import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Context from "./context";
import { AppSidebar } from "@/components/common/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/common/mode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Dashboard",
  description: "Navigate the crypto market with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="light"
      style={{ colorScheme: "light" }}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Context>
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="cursor-pointer mt-2 ml-2" />
            <ModeToggle className="cursor-pointer absolute top-2 right-2" />
            <main className="p-4 mx-auto w-full">
              {children}
            </main>
          </SidebarProvider>
        </Context>
      </body>
    </html >
  );
}
