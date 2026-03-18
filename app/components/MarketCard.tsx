"use client";

import { useState } from "react";
import { Market } from "../data/markets";

function formatNumber(num: number): string {
  if (num >= 1e18) return num.toExponential(1);
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1e3) return num.toLocaleString();
  if (Number.isInteger(num)) return num.toString();
  return num.toString();
}

export default function MarketCard({
  market,
  onClose,
}: {
  market: Market;
  onClose: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center safe-bottom"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md fade-in" />

      {/* Card */}
      <div
        className="perspective relative w-full max-w-md mx-4 mb-4 sm:mb-0 slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`card-inner cursor-pointer ${flipped ? "flipped" : ""}`}
          onClick={() => setFlipped(!flipped)}
        >
          {/* Front — Question */}
          <div className="card-front absolute inset-0 rounded-3xl glass-solid p-7 flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--accent)] opacity-80">
                  {market.category}
                </span>
                <span className="text-[11px] text-[var(--text-muted)]">
                  #{market.id.toString().padStart(3, "0")}
                </span>
              </div>
              <h2 className="text-[22px] font-semibold leading-[1.3] text-white mt-4">
                {market.question}
              </h2>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
              <span className="text-[13px] text-[var(--text-muted)]">
                Tap to reveal answer
              </span>
              <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-[var(--text-secondary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Back — Answer */}
          <div className="card-back rounded-3xl glass-solid p-7 flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--accent)] opacity-80">
                  {market.category}
                </span>
                <span className="text-[11px] text-[var(--text-muted)]">
                  #{market.id.toString().padStart(3, "0")}
                </span>
              </div>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mt-3">
                {market.question}
              </p>
              <div className="number-reveal text-center py-10">
                <p className="text-[56px] font-bold tracking-tight text-white leading-none">
                  {formatNumber(market.answer)}
                </p>
                {market.unit && (
                  <p className="text-[15px] text-[var(--text-secondary)] mt-3">
                    {market.unit}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <p className="text-[11px] text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">
                Source
              </p>
              <a
                href={market.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[var(--accent)] hover:text-[var(--accent-bright)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {market.source} ↗
              </a>
            </div>
          </div>
        </div>

        {/* Close pill */}
        <button
          onClick={onClose}
          className="absolute -top-14 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 text-[13px] text-[var(--text-secondary)] hover:text-white transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
