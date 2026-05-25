"use client";

import { useState } from "react";
import { Mail, Zap, CheckCircle2, Star, Radio } from "lucide-react";
import Toast from "@/components/ui/Toast";

const benefits = [
  { icon: "📖", title: "Exclusive Micro-Story", desc: "A short FREQ story you won't find on any platform. Just for subscribers." },
  { icon: "🔬", title: "Behind the Science", desc: "The real research, papers, and tech behind each week's story. Curated and explained simply." },
  { icon: "📊", title: "Building in Public Update", desc: "Honest numbers: subscriber counts, revenue, what worked and what flopped. No fluff." },
  { icon: "🎁", title: "FREQ Universe Bible — Free", desc: "42-page world-building PDF delivered the moment you confirm your email." },
];

const testimonials = [
  {
    text: "The science breakdowns are what got me. I didn't expect to learn actual astrophysics from a sci-fi newsletter.",
    author: "Leon T.",
    role: "Engineer, Kuala Lumpur",
  },
  {
    text: "I love that it's bilingual. I use the Chinese version to practice reading and the English version to understand everything I missed.",
    author: "Mei S.",
    role: "Student, Singapore",
  },
  {
    text: "The income reports alone are worth subscribing. Finally someone in this space who's honest about what's working.",
    author: "Amir H.",
    role: "Creator, Malaysia",
  },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setToast(`Welcome to The Signal, ${name || "friend"}! Check your inbox.`);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-violet-900/40 border border-violet-500/30 flex items-center justify-center pulse-glow">
            <Radio size={28} className="text-violet-400" />
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/30 border border-violet-500/20 text-violet-300 text-xs font-medium mb-4">
          <Zap size={12} />
          312+ subscribers · Published weekly
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
          The <span className="text-gradient">Signal</span>
        </h1>
        <p className="text-xl text-gray-400 font-mono mb-4">信号周刊</p>
        <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">
          Weekly sci-fi, science, and the honest story of building a bilingual content brand from scratch. Free forever.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Form */}
        <div>
          {!submitted ? (
            <div className="rounded-2xl border border-[#2a2a3a] bg-[#12121a] p-8">
              <h2 className="text-white font-bold text-xl mb-1">Subscribe to The Signal</h2>
              <p className="text-gray-400 text-sm mb-6">Free. Bilingual. No spam. Unsubscribe anytime.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Your name (optional)</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] focus:border-violet-500 focus:outline-none text-white placeholder-gray-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Email address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] focus:border-violet-500 focus:outline-none text-white placeholder-gray-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Mail size={16} />
                  Subscribe + Get Free PDF
                </button>
              </form>

              <p className="text-gray-500 text-xs mt-4 text-center">
                By subscribing you agree to receive weekly emails. Unsubscribe anytime.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-900/10 p-8 text-center">
              <CheckCircle2 size={40} className="text-emerald-400 mx-auto mb-4" />
              <h2 className="text-white font-bold text-xl mb-2">You&apos;re in The Signal! 📡</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Check your inbox — your welcome email with the <strong className="text-white">FREQ Universe Bible PDF</strong> is on its way.
                First issue drops next Sunday.
              </p>
            </div>
          )}

          {/* Testimonials */}
          <div className="mt-6 space-y-4">
            {testimonials.map((t) => (
              <div key={t.author} className="p-4 rounded-xl border border-[#2a2a3a] bg-[#12121a]">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} fill="#7c3aed" className="text-violet-500" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-2">
                  <span className="text-white text-xs font-semibold">{t.author}</span>
                  <span className="text-gray-500 text-xs ml-1">· {t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Benefits */}
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">What&apos;s inside every issue</h2>
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-4 p-5 rounded-xl border border-[#2a2a3a] bg-[#12121a]">
              <div className="text-2xl shrink-0">{b.icon}</div>
              <div>
                <div className="text-white font-semibold">{b.title}</div>
                <div className="text-gray-400 text-sm mt-1 leading-relaxed">{b.desc}</div>
              </div>
            </div>
          ))}

          {/* Sample issue */}
          <div className="p-5 rounded-xl border border-violet-500/20 bg-violet-900/10">
            <div className="text-violet-300 text-xs font-semibold uppercase tracking-wider mb-3">
              Sample Issue — May 22, 2026
            </div>
            <div className="text-white font-bold mb-1">⚡ The Signal #4</div>
            <div className="text-gray-400 text-sm space-y-2">
              <p>📖 Exclusive story: &ldquo;Carbon Memory&rdquo; (full EN + CN)</p>
              <p>🔬 Science: How real carbon-capture trees store atmospheric data</p>
              <p>📊 Month 3 update: 312 subscribers, first RM 35 earned</p>
              <p>🛠 Tool reveal: How I use Claude for bilingual translation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium tier teaser */}
      <div className="mt-20 rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-900/20 to-[#12121a] p-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-medium mb-4">
          <Star size={12} fill="currentColor" />
          Coming Soon: Premium Tier
        </div>
        <h3 className="text-white font-bold text-2xl mb-2">The Signal — Premium</h3>
        <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed mb-6">
          Exclusive chapters, early access (1 week ahead), member Discord, and monthly story votes.
          RM 25/month. Launching Month 4.
        </p>
        <button
          onClick={() => setToast("Premium tier launching soon! Subscribe free now to get notified first.")}
          className="px-6 py-2.5 rounded-xl border border-violet-500/40 text-violet-300 hover:bg-violet-900/30 text-sm font-medium transition-all"
        >
          Notify me at launch
        </button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
