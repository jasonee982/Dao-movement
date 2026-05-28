"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Radio, TrendingUp, Mail, ChevronRight } from "lucide-react";
import StoryCard from "@/components/ui/StoryCard";
import Toast from "@/components/ui/Toast";
import { stories, stats, platforms, products } from "@/data/content";

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ label, value, suffix, animate }: { label: string; value: number; suffix: string; animate: boolean }) {
  const count = useCountUp(value, 1200, animate);
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-violet-400 tabular-nums">
        {animate ? count : 0}{suffix}
      </div>
      <div className="text-gray-400 text-sm mt-1">{label}</div>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setToast(`You're in! Check ${email} for your welcome email + free FREQ Universe Bible.`);
    setEmail("");
  }

  const featuredStories = stories.filter((s) => s.featured);

  return (
    <div className="grid-bg min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-900/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-900/15 blur-3xl pointer-events-none" />

        <div className="fade-in-up flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-900/20 text-violet-300 text-sm font-medium mb-6">
          <Radio size={14} className="animate-pulse" />
          <span>Signal Broadcasting — Season 1 Active</span>
        </div>

        <h1
          className="fade-in-up text-5xl sm:text-7xl font-black tracking-tight text-white max-w-4xl leading-none mb-2"
          style={{ animationDelay: "0.1s" }}
        >
          Stories from the{" "}
          <span className="text-gradient">frequency</span>
          <br />
          between worlds
        </h1>
        <p
          className="fade-in-up text-xl text-gray-400 font-mono mt-2"
          style={{ animationDelay: "0.15s" }}
        >
          频率之间的故事
        </p>

        <p
          className="fade-in-up text-gray-400 text-lg max-w-xl mt-6 leading-relaxed"
          style={{ animationDelay: "0.2s" }}
        >
          Bilingual sci-fi at the edge of real technology. Published weekly across 5 platforms
          in English and Chinese. Written by a General Manager who builds the future by day —
          and writes about it by night.
        </p>

        <div
          className="fade-in-up flex flex-col sm:flex-row items-center gap-4 mt-8"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="/stories"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all hover:scale-105"
          >
            Read the Stories
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/newsletter"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2a2a3a] hover:border-violet-600 text-gray-300 hover:text-white font-semibold transition-all"
          >
            <Mail size={16} />
            Subscribe to The Signal
          </Link>
        </div>

        <div
          className="fade-in-up mt-12 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="text-gray-500 text-sm">Published on:</span>
          {platforms.map((p) => (
            <span
              key={p.name}
              className="px-3 py-1 rounded-full bg-[#1a1a26] border border-[#2a2a3a] text-gray-300 text-sm"
            >
              {p.flag} {p.name}
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-16 border-y border-[#2a2a3a] bg-[#0d0d14]">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} animate={statsVisible} />
          ))}
        </div>
      </section>

      {/* Featured Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Featured Stories</h2>
            <p className="text-gray-400 mt-1">Latest transmissions from the FREQ universe</p>
          </div>
          <Link
            href="/stories"
            className="flex items-center gap-1 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
          >
            All Stories <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* Flywheel */}
      <section className="py-20 border-t border-[#2a2a3a] bg-[#0d0d14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white">The FREQ Flywheel</h2>
            <p className="text-gray-400 mt-2">How one story compounds across platforms, lists, and products</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "✍️", label: "Write Once", desc: "One story, one science breakdown, one perspective" },
              { icon: "📡", label: "Broadcast Everywhere", desc: "5 platforms × 2 languages = 10 content pieces from 1 story" },
              { icon: "📧", label: "Own the Audience", desc: "Email list converts followers into subscribers you keep" },
              { icon: "💎", label: "Products That Scale", desc: "Ebooks, courses & memberships sell while you sleep" },
            ].map((step, i) => (
              <div key={step.label} className="relative">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-10 -right-2 text-gray-600 z-10">
                    <ArrowRight size={16} />
                  </div>
                )}
                <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6 h-full hover:border-violet-800 transition-colors">
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <div className="text-white font-semibold mb-2">{step.label}</div>
                  <div className="text-gray-400 text-sm leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Product Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">The Product Stack</h2>
            <p className="text-gray-400 mt-1">From free to flagship — choose your entry point</p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {products.slice(0, 3).map((p) => (
            <div key={p.id} className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6 hover:border-violet-800 transition-colors">
              <div className="text-2xl mb-3">{p.icon}</div>
              <div className="text-white font-semibold">{p.name}</div>
              <div className="text-violet-400 font-bold text-lg mt-1">{p.priceDisplay}</div>
              <div className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-2">{p.description}</div>
              <Link
                href="/products"
                className="mt-4 inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
              >
                Learn more <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 border-t border-[#2a2a3a]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-violet-900/40 border border-violet-500/30 flex items-center justify-center pulse-glow">
              <Zap size={24} className="text-violet-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Catch The Signal</h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Join <strong className="text-violet-400">489+</strong> readers getting exclusive micro-stories,
            behind-the-science breakdowns, and honest updates on building FREQ as a one-person business.
            Weekly. Free forever.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] focus:border-violet-500 focus:outline-none text-white placeholder-gray-500 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all hover:scale-105"
            >
              Subscribe Free
            </button>
          </form>
          <p className="text-gray-500 text-xs mt-3">
            Get the <strong className="text-gray-400">FREQ Universe Bible</strong> (42-page PDF) free when you subscribe.
          </p>
        </div>
      </section>

      {/* Build in Public teaser */}
      <section className="py-20 border-t border-[#2a2a3a] bg-[#0d0d14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white">Building FREQ in Public</h2>
              <p className="text-gray-400 mt-1">Transparent income reports, workflow reveals, and honest takes</p>
            </div>
            <Link
              href="/build-in-public"
              className="flex items-center gap-1 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
            >
              Full Journal <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "How I Publish on 5 Platforms in 2 Languages", date: "May 8, 2026", tag: "Workflow" },
              { title: "How AI Helps Me Write Sci-Fi (And Where It Fails)", date: "May 22, 2026", tag: "Honest Take" },
            ].map((post) => (
              <Link
                href="/build-in-public"
                key={post.title}
                className="flex items-start gap-4 p-5 rounded-xl border border-[#2a2a3a] bg-[#12121a] hover:border-violet-800 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-900/40 flex items-center justify-center shrink-0">
                  <TrendingUp size={18} className="text-violet-400" />
                </div>
                <div>
                  <div className="text-xs text-violet-400 font-medium mb-1">{post.tag}</div>
                  <div className="text-white font-semibold leading-tight group-hover:text-violet-300 transition-colors">
                    {post.title}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">{post.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
