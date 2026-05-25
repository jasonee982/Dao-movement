import Link from "next/link";
import { Clock, BookOpen } from "lucide-react";
import type { stories } from "@/data/content";

type Story = (typeof stories)[number];

export default function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/stories/${story.id}`} className="block group">
      <div className="card-hover rounded-xl border border-[#2a2a3a] bg-[#12121a] overflow-hidden h-full">
        {/* Cover */}
        <div className={`h-36 bg-gradient-to-br ${story.coverGradient} relative`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {story.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/40 text-white border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-0.5 rounded text-xs font-mono text-white/60 bg-black/40">
              Ch.{story.chapter}
            </span>
          </div>
          {story.featured && (
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-bold bg-violet-600 text-white">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-violet-300 transition-colors">
            {story.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1 font-mono">{story.titleCN}</p>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed line-clamp-3">
            {story.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {story.readTime}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen size={12} />
                {story.platform}
              </span>
            </div>
            <span>{story.publishedAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
