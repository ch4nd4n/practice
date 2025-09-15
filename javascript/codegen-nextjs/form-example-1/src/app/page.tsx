"use client";

import HelloCard from "@/components/molecules/hello-card";
import StockNavCard from "@/components/molecules/stock-nav-card";

import { mockStockNavHistory } from "@/lib/mockdata";

export default function Home() {
  return (
    <main>
      <div className="flex items-stretch justify-center gap-2">
        <HelloCard />
        <StockNavCard stockNavHistory={mockStockNavHistory} />
      </div>
    </main>
  );
}
