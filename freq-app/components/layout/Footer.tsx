import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a3a] bg-[#0a0a0f] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-wider">FREQ</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Sci-fi stories at the intersection of real industry, speculative fiction, and bilingual storytelling. Written by a GM by day, writer by night.
            </p>
            <p className="text-gray-500 text-xs mt-4 font-mono">频率 · FREQUENCY · FREQ</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/stories" className="hover:text-violet-400 transition-colors">Stories</Link></li>
              <li><Link href="/products" className="hover:text-violet-400 transition-colors">Products</Link></li>
              <li><Link href="/newsletter" className="hover:text-violet-400 transition-colors">Newsletter</Link></li>
              <li><Link href="/build-in-public" className="hover:text-violet-400 transition-colors">Build in Public</Link></li>
              <li><Link href="/about" className="hover:text-violet-400 transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Find FREQ On</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="hover:text-violet-400 transition-colors cursor-pointer">知乎 (Zhihu)</span></li>
              <li><span className="hover:text-violet-400 transition-colors cursor-pointer">抖音 (Douyin)</span></li>
              <li><span className="hover:text-violet-400 transition-colors cursor-pointer">小红书</span></li>
              <li><span className="hover:text-violet-400 transition-colors cursor-pointer">TikTok</span></li>
              <li><span className="hover:text-violet-400 transition-colors cursor-pointer">Instagram</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[#2a2a3a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 FREQ. Built in public. One person. One signal.
          </p>
          <p className="text-gray-600 text-xs font-mono">
            Powered by Dan Koe&apos;s OPC Framework
          </p>
        </div>
      </div>
    </footer>
  );
}
