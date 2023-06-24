import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main
        className={`${inter.variable} flex min-h-screen flex-col items-center gap-8 bg-slate-950 py-16 font-sans text-slate-300 text-sm md:text-base`}
      >
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
