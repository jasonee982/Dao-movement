"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, DollarSign, Users, BookOpen, ArrowRight } from "lucide-react";
import { buildInPublicPosts, roadmapPhases } from "@/data/content";
import Toast from "@/components/ui/Toast";

function MetricBadge({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1a26] border border-[#2a2a3a]">
      <span className="text-violet-400">{icon}</span>
      <div>
        <div className="text-white text-xs font-bold">{value}</div>
        <div className="text-gray-500 text-xs">{label}</div>
      </div>
    </div>
  );
}

const statusColors: Record<string, string> = {
  active: "border-violet-500 bg-violet-900/20",
  upcoming: "border-[#2a2a3a] bg-[#12121a]",
  future: "border-[#2a2a3a] bg-[#0d0d14] opacity-70",
};

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: "In Progress", color: "text-violet-300 bg-violet-900/40 border-violet-500/30" },
  upcoming: { label: "Up Next", color: "text-blue-300 bg-blue-900/40 border-blue-500/30" },
  future: { label: "Future", color: "text-gray-400 bg-gray-900/40 border-gray-500/30" },
};

export default function BuildInPublicPage() {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/30 border border-violet-500/20 text-violet-300 text-xs font-medium mb-4">
          <TrendingUp size={12} />
          Transparent · No Fluff · Real Numbers
        </div>
        <h1 className="text-4xl font-black text-white mb-2">Building FREQ in Public</h1>
        <p className="text-gray-400 text-lg max-w-xl">
          The complete journal of building a bilingual sci-fi content brand from zero. Income reports,
          workflow reveals, tool stacks, honest takes.
        </p>
      </div>

      {/* Current metrics */}
      <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6 mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold">📊 Live Dashboard — May 2026</h2>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Phase 1 Active
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          <MetricBadge icon={<Users size={14} />} value="312" label="Subscribers" />
          <MetricBadge icon={<DollarSign size={14} />} value="RM 35" label="Revenue" />
          <MetricBadge icon={<BookOpen size={14} />} value="4" label="Stories" />
          <MetricBadge icon={<TrendingUp size={14} />} value="5" label="Platforms" />
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Phase 1 Goal: 500 subscribers</span>
            <span>312 / 500 (62%)</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "62%" }} />
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="mb-16">
        <h2 className="text-white font-bold text-2xl mb-6">The Journal</h2>
        <div className="space-y-4">
          {buildInPublicPosts.map((post) => (
            <div
              key={post.id}
              className="p-6 rounded-xl border border-[#2a2a3a] bg-[#12121a] hover:border-violet-800 transition-colors group cursor-pointer"
              onClick={() => setToast(`"${post.title}" — Full post coming in The Signal newsletter!`)}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-xs font-medium bg-violet-900/30 text-violet-300 border border-violet-500/20"
                      >
                        {t}
                      </span>
                    ))}
                    <span className="text-gray-500 text-xs">{post.date}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight group-hover:text-violet-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="flex flex-row sm:flex-col gap-2 sm:items-end shrink-0">
                  <MetricBadge icon={<Users size={11} />} value={String(post.metrics.subscribers)} label="subs" />
                  <MetricBadge icon={<DollarSign size={11} />} value={post.metrics.revenue} label="rev" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-violet-400 text-sm font-medium">
                Read full post <ArrowRight size={13} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div>
        <h2 className="text-white font-bold text-2xl mb-2">The Roadmap</h2>
        <p className="text-gray-400 text-sm mb-8">4 phases. 24 months. One-person business.</p>
        <div className="space-y-4">
          {roadmapPhases.map((phase) => (
            <div
              key={phase.phase}
              className={`rounded-xl border p-6 transition-colors ${statusColors[phase.status]}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl font-black text-gray-600">0{phase.phase}</span>
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        Phase {phase.phase}: {phase.label}
                      </h3>
                      <span className="text-gray-500 text-xs">{phase.months}</span>
                    </div>
                  </div>
                  <div className="text-violet-300 text-sm font-medium ml-10">{phase.goal}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-emerald-400 font-mono text-sm font-semibold">{phase.revenue}</span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      statusLabels[phase.status].color
                    }`}
                  >
                    {statusLabels[phase.status].label}
                  </span>
                </div>
              </div>
              <ul className="ml-10 space-y-1.5">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-400 text-sm">
                    <span className="text-violet-500 mt-0.5">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 text-center">
        <p className="text-gray-400 mb-4">
          Want to follow this journey in real time? The full income reports and strategy breakdowns are in The Signal.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all hover:scale-105"
        >
          Subscribe to The Signal
          <ArrowRight size={16} />
        </Link>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
