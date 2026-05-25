import Link from "next/link";
import { ArrowRight, Briefcase, PenLine, Globe, Brain } from "lucide-react";
import { platforms } from "@/data/content";

const stack = [
  { task: "Story research & fact-checking", tool: "Claude", time: "2-3 hrs → 30 min" },
  { task: "Translation (CN ↔ EN)", tool: "Claude + human polish", time: "2 hrs → 20 min" },
  { task: "Video narration", tool: "剪映 AI TTS", time: "No recording needed" },
  { task: "Cover art & visuals", tool: "MidJourney / Canva", time: "Custom art in minutes" },
  { task: "Social copy variants", tool: "Claude", time: "5 platforms in 10 min" },
  { task: "Email newsletter drafts", tool: "Claude → human edit", time: "1 hr → 15 min" },
];

const mindshifts = [
  {
    icon: "💼",
    title: '"Your salary is your investor"',
    desc: "The GM salary funds the FREQ experiment. Don't quit. Use it as runway. Build the business in the margins.",
  },
  {
    icon: "🧩",
    title: '"Solve your own problems, then sell the solution"',
    desc: "How does a busy professional build a bilingual content brand from scratch? That IS the product.",
  },
  {
    icon: "📡",
    title: '"Long-form builds trust, short-form builds reach"',
    desc: "知乎 + newsletter = trust (where people decide to buy). 抖音 / TikTok = reach. Both are essential.",
  },
  {
    icon: "🤖",
    title: '"AI is a force multiplier, not a replacement"',
    desc: "AI makes commoditized parts free. Your voice, perspective, and real-world experience are the moat.",
  },
  {
    icon: "🏘️",
    title: '"Community is the final moat"',
    desc: "When AI can write, human connection is what can't be replicated. The FREQ community is the endgame.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/30 border border-violet-500/20 text-violet-300 text-xs font-medium mb-4">
          The Person Behind the Signal
        </div>
        <h1 className="text-4xl font-black text-white mb-4">About FREQ</h1>
        <blockquote className="border-l-4 border-violet-500 pl-5 italic text-gray-300 text-lg leading-relaxed">
          &ldquo;The future of business is one person with a laptop, a vision, and a signal that resonates.&rdquo;
          <br />
          <span className="text-gray-500 text-base not-italic">— The FREQ Manifesto</span>
        </blockquote>
      </div>

      {/* Who I am */}
      <section className="mb-14">
        <h2 className="text-white font-bold text-2xl mb-6">Who builds this</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: <Briefcase size={20} className="text-violet-400" />,
              label: "By Day",
              title: "General Manager",
              desc: "Running an industrial park — real infrastructure, real technology, real constraints. The future is built here.",
            },
            {
              icon: <PenLine size={20} className="text-violet-400" />,
              label: "By Night",
              title: "Sci-Fi Writer",
              desc: "Translating real-world tech and industry experience into speculative fiction. The stories write themselves.",
            },
            {
              icon: <Globe size={20} className="text-violet-400" />,
              label: "The Advantage",
              title: "Bilingual & Bicultural",
              desc: "Malaysian-Chinese perspective on global themes. Fluent in English and Mandarin. Two audiences, one voice.",
            },
            {
              icon: <Brain size={20} className="text-violet-400" />,
              label: "The Framework",
              title: "One-Person Company",
              desc: "Built on Dan Koe's OPC model: content → trust → products → community. FREQ is not a hobby — it's a business.",
            },
          ].map((item) => (
            <div key={item.label} className="p-5 rounded-xl border border-[#2a2a3a] bg-[#12121a]">
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <span className="text-gray-500 text-xs uppercase tracking-wider font-medium">{item.label}</span>
              </div>
              <div className="text-white font-bold mb-1">{item.title}</div>
              <div className="text-gray-400 text-sm leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The FREQ niche */}
      <section className="mb-14 p-6 rounded-xl border border-violet-500/20 bg-violet-900/10">
        <h2 className="text-white font-bold text-xl mb-3">The Niche Nobody Else Has</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          Dan Koe says: &ldquo;Don&apos;t find a niche — become one.&rdquo; FREQ is the intersection of:
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            "Industrial Park GM",
            "Sci-Fi Writer",
            "Bilingual (EN + CN)",
            "Malaysian Perspective",
            "One-Person Business",
            "Real Industry × Speculative Fiction",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full bg-violet-900/40 border border-violet-500/30 text-violet-300 text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-4 leading-relaxed">
          Nobody else has this stack. That&apos;s the moat.
        </p>
      </section>

      {/* Platforms */}
      <section className="mb-14">
        <h2 className="text-white font-bold text-2xl mb-6">Where FREQ broadcasts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {platforms.map((p) => (
            <div key={p.name} className="p-4 rounded-xl border border-[#2a2a3a] bg-[#12121a] flex items-center gap-3">
              <span className="text-2xl">{p.flag}</span>
              <div>
                <div className="text-white font-semibold">{p.name}</div>
                <div className="text-gray-500 text-xs">{p.label} · {p.type}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Stack */}
      <section className="mb-14">
        <h2 className="text-white font-bold text-2xl mb-2">The AI Stack</h2>
        <p className="text-gray-400 text-sm mb-6">
          AI is the force multiplier. But the voice, perspective, and lived experience are the moat.
        </p>
        <div className="rounded-xl border border-[#2a2a3a] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a3a] bg-[#0d0d14]">
                <th className="text-left p-4 text-gray-400 font-medium">Task</th>
                <th className="text-left p-4 text-gray-400 font-medium">Tool</th>
                <th className="text-left p-4 text-gray-400 font-medium hidden sm:table-cell">Time Saved</th>
              </tr>
            </thead>
            <tbody>
              {stack.map((row, i) => (
                <tr
                  key={row.task}
                  className={`border-b border-[#2a2a3a] last:border-0 ${
                    i % 2 === 0 ? "bg-[#12121a]" : "bg-[#0d0d14]"
                  }`}
                >
                  <td className="p-4 text-gray-300">{row.task}</td>
                  <td className="p-4 text-violet-300 font-mono text-xs">{row.tool}</td>
                  <td className="p-4 text-emerald-400 text-xs hidden sm:table-cell">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mindset shifts */}
      <section className="mb-14">
        <h2 className="text-white font-bold text-2xl mb-6">The Mindset Shifts (from Dan Koe)</h2>
        <div className="space-y-4">
          {mindshifts.map((m) => (
            <div key={m.title} className="flex gap-4 p-5 rounded-xl border border-[#2a2a3a] bg-[#12121a]">
              <div className="text-2xl shrink-0">{m.icon}</div>
              <div>
                <div className="text-white font-semibold text-sm italic">{m.title}</div>
                <div className="text-gray-400 text-sm mt-1 leading-relaxed">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/stories"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all"
        >
          Read the Stories <ArrowRight size={16} />
        </Link>
        <Link
          href="/newsletter"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#2a2a3a] hover:border-violet-600 text-gray-300 hover:text-white font-semibold transition-all"
        >
          Subscribe to The Signal
        </Link>
        <Link
          href="/build-in-public"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#2a2a3a] hover:border-violet-600 text-gray-300 hover:text-white font-semibold transition-all"
        >
          Follow the Journey
        </Link>
      </div>
    </div>
  );
}
