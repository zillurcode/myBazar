import { Suspense } from "react";
import TodayPriceRise from "@/app/component/header/TodayPriceRise";
import PriceDown from "@/app/component/header/PriceDown";
import AllproductsSection from "@/app/component/header/AllproductsSection";
import "./globals.css";




function SectionFallback({ label }: { label: string }) {
  return (
    <div className="animate-pulse py-4 text-center text-gray-500">
      Loading {label}...
    </div>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto space-y-8 px-4 py-6">
      <Suspense fallback={<SectionFallback label="price rises" />}>
        <TodayPriceRise />
      </Suspense>

      <Suspense fallback={<SectionFallback label="price falls" />}>
        <PriceDown />
      </Suspense>

      <Suspense fallback={<SectionFallback label="all products" />}>
        <AllproductsSection />
      </Suspense>
    </main>
  );
}