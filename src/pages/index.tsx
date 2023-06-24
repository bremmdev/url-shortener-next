import Image from "next/image";
import { Inter } from "next/font/google";
import ShortCount from "@/components/Shorten/ShortCount";

const inter = Inter({ subsets: ["latin"] });
import URLShortener from "@/components/Shorten/URLShortener";

export default function Home() {
  return (
    <div className="w-full">
      <h1 className="text-center text-3xl font-bold tracking-tighter text-amber-100 md:text-5xl">
        URL Shortener
      </h1>
      <ShortCount />
      <URLShortener />
    </div>
  );
}
