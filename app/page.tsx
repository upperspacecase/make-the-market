"use client";

import { useState, useEffect, useCallback } from "react";
import { markets, categories } from "./data/markets";
import MarketCard from "./components/MarketCard";
import type { Market } from "./data/markets";

const categoryIcons: Record<string, string> = {
  Nature: "🌿",
  Geography: "🌍",
  Science: "🔬",
  Sports: "⚽",
  Technology: "💻",
  Economics: "📈",
  Food: "🍕",
  History: "🏛️",
  Health: "❤️",
  "Pop Culture": "🎬",
};

export default function Home() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());

  const handleClose = useCallback(() => {
    if (selectedMarket) {
      setRevealedIds((prev) => new Set(prev).add(selectedMarket.id));
    }
    setSelectedMarket(null);
  }, [selectedMarket]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  const filtered = activeCategory
    ? markets.filter((m) => m.category === activeCategory)
    : markets;

  const revealedCount = revealedIds.size;
  const totalCount = markets.length;

  return (
    <div className="min-h-screen min-h-[100dvh] safe-top safe-bottom">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[var(--bg-primary)]/80 safe-top">
        <div className="max-w-lg mx-auto px-5 pt-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[20px] font-semibold tracking-tight text-white">
              Make the Market
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[var(--accent)] font-medium bg-[var(--accent)]/10 px-2.5 py-1 rounded-full">
                {revealedCount}/{totalCount}
              </span>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-3">
            <button
              onClick={() => setActiveCategory(null)}
              className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                activeCategory === null
                  ? "bg-white text-[var(--bg-primary)]"
                  : "bg-white/[0.06] text-[var(--text-secondary)] border border-white/[0.08]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-white text-[var(--bg-primary)]"
                    : "bg-white/[0.06] text-[var(--text-secondary)] border border-white/[0.08]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Market List */}
      <main className="max-w-lg mx-auto px-5 pb-8">
        <div className="space-y-2 pt-2">
          {filtered.map((market) => {
            const revealed = revealedIds.has(market.id);
            const icon = categoryIcons[market.category] || "📊";
            return (
              <button
                key={market.id}
                onClick={() => setSelectedMarket(market)}
                className={`market-item w-full text-left rounded-2xl glass p-4 flex items-center gap-4 ${
                  revealed ? "opacity-40" : ""
                }`}
              >
                {/* Icon */}
                <div className="shrink-0 w-11 h-11 rounded-xl bg-white/[0.06] flex items-center justify-center text-lg">
                  {icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-white leading-snug line-clamp-2">
                    {market.question}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-[var(--accent)] font-medium">
                      {market.category}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      #{market.id.toString().padStart(3, "0")}
                    </span>
                    {revealed && (
                      <span className="text-[11px] text-[var(--text-muted)]">
                        · Revealed
                      </span>
                    )}
                  </div>
                </div>

                {/* Chevron */}
                <svg
                  className="shrink-0 w-4 h-4 text-[var(--text-muted)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </main>

      {/* Card Modal */}
      {selectedMarket && (
        <MarketCard market={selectedMarket} onClose={handleClose} />
      )}
    </div>
  );
}
