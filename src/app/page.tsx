import { Suspense } from "react";
import TodayPriceRise from "@/app/component/header/TodayPriceRise";
import PriceDown from "@/app/component/header/PriceDown";
import AllproductsSection from "@/app/component/header/AllproductsSection";

export const dynamic = 'force-dynamic'; // Stops static prerender memory loops

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6 space-y-8">
      <Suspense fallback={<div className="text-center py-4">Loading price rises...</div>}>
        <TodayPriceRise />
      </Suspense>

      <Suspense fallback={<div className="text-center py-4">Loading price falls...</div>}>
        <PriceDown />
      </Suspense>

      <Suspense fallback={<div className="text-center py-4">Loading all products...</div>}>
        <AllproductsSection />
      </Suspense>
    </main>
  );
}