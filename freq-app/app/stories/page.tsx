"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import StoryCard from "@/components/ui/StoryCard";
import { stories } from "@/data/content";

const allTags = Array.from(new Set(stories.flatMap((s) => s.tags)));

export default function StoriesPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [lang, setLang] = useState<"en" | "cn">("en");

  const filtered = stories.filter((s) => {
    const text = lang === "en" ? s.title + s.excerpt : s.titleCN + s.excerptCN;
    const matchesSearch = text.toLowerCase().includes(search.toLowerCase());
    const matchesTag = activeTag ? s.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/30 border border-violet-500/20 text-violet-300 text-xs font-medium mb-4">
          📡 All Transmissions
        </div>
        <h1 className="text-4xl font-black text-white">FREQ Stories</h1>
        <p className="text-gray-400 mt-2 text-lg">每一个故事都是一个信号 · Every story is a signal</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "en" ? "Search stories..." : "搜索故事..."}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] focus:border-violet-500 focus:outline-none text-white placeholder-gray-500 text-sm"
          />
        </div>

        {/* Language toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#1a1a26] border border-[#2a2a3a]">
          <button
            onClick={() => setLang("en")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              lang === "en" ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("cn")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              lang === "cn" ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            中文
          </button>
        </div>
      </div>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveTag(null)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
            activeTag === null
              ? "bg-violet-600 border-violet-500 text-white"
              : "bg-transparent border-[#2a2a3a] text-gray-400 hover:border-violet-700 hover:text-white"
          }`}
        >
          <Filter size={12} />
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
              activeTag === tag
                ? "bg-violet-600 border-violet-500 text-white"
                : "bg-transparent border-[#2a2a3a] text-gray-400 hover:border-violet-700 hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">📡</div>
          <p className="text-gray-400">No transmissions found matching your search.</p>
        </div>
      )}
    </div>
  );
}
