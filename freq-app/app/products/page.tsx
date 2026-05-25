"use client";

import { useState } from "react";
import { Layers, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Toast from "@/components/ui/Toast";
import { products } from "@/data/content";

const tiers = [
  { key: "all", label: "All Products" },
  { key: "free", label: "Free" },
  { key: "low", label: "Ebooks" },
  { key: "mid", label: "Membership & Courses" },
  { key: "high", label: "Premium" },
];

export default function ProductsPage() {
  const [activeTier, setActiveTier] = useState("all");
  const [toast, setToast] = useState<string | null>(null);

  const filtered = activeTier === "all" ? products : products.filter((p) => p.tier === activeTier);

  function handleAction(name: string) {
    setToast(`✨ "${name}" — coming soon! Join The Signal newsletter to get notified first.`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/30 border border-violet-500/20 text-violet-300 text-xs font-medium mb-4">
          <Layers size={12} />
          The FREQ Product Stack
        </div>
        <h1 className="text-4xl font-black text-white mb-3">
          From Free to{" "}
          <span className="text-gradient">Flagship</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Every tier of the FREQ stack is designed to deliver real value. Start free — upgrade when ready.
        </p>

        {/* Revenue comparison */}
        <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] text-sm">
          <span className="text-gray-400 line-through">Platform-only: RM 3K/mo ceiling</span>
          <ArrowRight size={14} className="text-violet-400" />
          <span className="text-violet-300 font-semibold">OPC Stack: RM 38K/mo potential</span>
        </div>
      </div>

      {/* Tier Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {tiers.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTier(t.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              activeTier === t.key
                ? "bg-violet-600 border-violet-500 text-white"
                : "bg-transparent border-[#2a2a3a] text-gray-400 hover:border-violet-700 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onAction={handleAction} />
        ))}
      </div>

      {/* FAQ / Value table */}
      <div className="mt-20 rounded-2xl border border-[#2a2a3a] bg-[#0d0d14] overflow-hidden">
        <div className="p-8 border-b border-[#2a2a3a]">
          <h2 className="text-white font-bold text-2xl">Why Digital Products?</h2>
          <p className="text-gray-400 mt-1">The math behind building a one-person business</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a3a]">
                <th className="text-left p-4 text-gray-400 font-medium">Model</th>
                <th className="text-left p-4 text-gray-400 font-medium">Year 1 Cap</th>
                <th className="text-left p-4 text-gray-400 font-medium">Year 2 Potential</th>
                <th className="text-left p-4 text-gray-400 font-medium">Margin</th>
                <th className="text-left p-4 text-gray-400 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#2a2a3a]">
                <td className="p-4 text-gray-300">Platform revenue only</td>
                <td className="p-4 text-gray-300">RM 3,000/mo</td>
                <td className="p-4 text-gray-300">RM 8,000/mo</td>
                <td className="p-4 text-yellow-400">~30%</td>
                <td className="p-4 text-red-400">High (algorithm)</td>
              </tr>
              <tr>
                <td className="p-4 text-violet-300 font-semibold">FREQ OPC Stack ✓</td>
                <td className="p-4 text-emerald-400 font-semibold">RM 11,000/mo</td>
                <td className="p-4 text-emerald-400 font-semibold">RM 38,000/mo</td>
                <td className="p-4 text-emerald-400">~95%</td>
                <td className="p-4 text-emerald-400">Low (owned)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
