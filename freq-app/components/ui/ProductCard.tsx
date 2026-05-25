"use client";

import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import type { products } from "@/data/content";

type Product = (typeof products)[number];

const badgeColors: Record<string, string> = {
  emerald: "bg-emerald-900/50 text-emerald-300 border-emerald-700/50",
  violet: "bg-violet-900/50 text-violet-300 border-violet-700/50",
  blue: "bg-blue-900/50 text-blue-300 border-blue-700/50",
  orange: "bg-orange-900/50 text-orange-300 border-orange-700/50",
};

export default function ProductCard({ product, onAction }: { product: Product; onAction: (name: string) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative rounded-xl border bg-[#12121a] flex flex-col transition-all duration-200 ${
        product.popular
          ? "border-violet-500 shadow-lg shadow-violet-900/30"
          : "border-[#2a2a3a] hover:border-violet-800"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-violet-600 text-white text-xs font-bold">
            <Star size={10} fill="white" />
            Most Popular
          </div>
        </div>
      )}

      <div className="p-6 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl">{product.icon}</div>
          <span
            className={`badge border text-xs ${
              badgeColors[product.badgeColor] ?? badgeColors.violet
            }`}
          >
            {product.badge}
          </span>
        </div>

        {/* Title & Price */}
        <h3 className="text-white font-bold text-lg leading-tight">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-0.5 font-mono">{product.nameCN}</p>
        <div className="mt-3 mb-4">
          <span className="text-2xl font-bold text-violet-400">{product.priceDisplay}</span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>

        {/* Features */}
        <ul className="mt-5 space-y-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
              <CheckCircle2 size={14} className="text-violet-400 mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="p-6 pt-0">
        <button
          onClick={() => onAction(product.name)}
          className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
            product.popular || hovered
              ? "bg-violet-600 hover:bg-violet-500 text-white"
              : "bg-[#1a1a26] hover:bg-violet-900/40 text-gray-300 border border-[#2a2a3a] hover:border-violet-700"
          }`}
        >
          {product.cta}
        </button>
      </div>
    </div>
  );
}
