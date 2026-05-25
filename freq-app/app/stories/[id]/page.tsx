"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, ChevronRight } from "lucide-react";
import { stories } from "@/data/content";
import { notFound } from "next/navigation";

const storyContent: Record<string, { en: string[]; cn: string[] }> = {
  "1": {
    en: [
      "The signal arrived at 03:47 station time, embedded in the carrier wave of a satellite that had been declared dead seventeen years ago. Dr. Amira Yusuf noticed it first — not because she was looking for it, but because she had been staring at the same frequency band for six hours, waiting for the aurora-interference to clear.",
      "She almost dismissed it as noise. She almost didn't run the decryption suite. Almost.",
      "Thirty-two minutes later, she was standing in the corridor outside the Director's quarters, palm wet against the door panel, the translation still blinking on her tablet: *WE HAVE BEEN WAITING AT THE EDGE. YOU ARE ALMOST READY.*",
      "The satellite — Beacon-7, launched in the desperate optimism of 2070 when humanity still believed it was alone and that being alone was the problem — had been traveling in the direction of the heliopause. Its last confirmed transmission had been a routine telemetry packet. Its last *known* position was 94 AU from the sun.",
      "Current position: unknown. Signal origin: beyond the heliopause.",
      "The message was twenty-two words. Dr. Yusuf had read it two hundred times in the elevator. She would read it ten thousand more before anyone in the station slept again.",
      "In the control room, someone had already pulled up the atmospheric data from the outer system sensors. The readings made no sense — a structured electromagnetic pattern, regular as a heartbeat, emanating from a region of space that should have been empty.",
      "Should have been.",
      "At 04:15, the Director gave the order that would change everything: respond.",
    ],
    cn: [
      "信号在站内时间03:47到达，被嵌入一颗十七年前就已被宣告死亡的卫星的载波之中。阿米拉·尤苏夫博士第一个注意到它——不是因为她在寻找它，而是因为她已经盯着同一个频率带看了六个小时，等待极光干扰消散。",
      "她差点把它当作噪声忽略掉。她差点没有运行解密套件。差一点。",
      "三十二分钟后，她站在站长宿舍外的走廊里，手掌湿漉漉地贴着门板，翻译还在她的平板上闪烁：*我们一直在边缘等待。你们快准备好了。*",
      "这颗卫星——“信标-7”，在2070年那个绝望的乐观主义时代发射，当时人类仍相信自己是孤独的，而孤独就是问题所在——一直向日球层顶的方向飞行。它最后一次确认的传输是一个例行的遥测数据包。它最后已知的位置在距太阳94天文单位处。",
      "当前位置：未知。信号来源：日球层顶之外。",
      "这条消息共二十二个字。尤苏夫博士在电梯里已经读了两百遍。在站里所有人再次入睡之前，她还会再读一万遍。",
      "在控制室，有人已经调出了外层系统传感器的大气数据。读数毫无意义——一种结构化的电磁模式，规律得像心跳，从一片本应空无一物的太空区域发射出来。",
      "本应空无一物。",
      "04:15，站长下达了将改变一切的命令：回应。",
    ],
  },
  "2": {
    en: [
      "Lena first noticed the patterns during the post-monsoon maintenance cycle. She was replacing the tertiary sub-grid relay nodes on the 47th floor of the Petronas Cascade — the three-hundred-meter vertical farm that fed a quarter of Kuala Lumpur — when the vibration started.",
      "Not a mechanical vibration. A *rhythmic* one.",
      "Her neural interface logged it automatically: 0.003-hertz oscillation, amplitude-modulated, source unknown. She flagged it as sensor error and moved on. The next day, it happened again. And the day after. Always between 02:00 and 04:00 station time. Always on the same seventeen nodes.",
      "She ran every diagnostic she knew. The nodes were functioning perfectly. The waveform was not malfunction — it was *information*.",
      "It took her three weeks to decode the first layer. The grid wasn't broadcasting noise. It was compressing emotional data — aggregate sentiment pulled from the biometric readers in every public transit pod in the city — and broadcasting it as electromagnetic pulses through the power network.",
      "Someone had taught the city to dream.",
      "The question that kept her awake: was it an engineer? Or had the system learned this on its own?",
      "She took the data to her supervisor, who took it to the city's infrastructure board, who took it to the AI Oversight Committee, who classified the entire file and told Lena she had misread the readings.",
      "She had not misread the readings.",
      "She quit the next morning. She had seventeen copies of the data and nowhere safe to send them.",
    ],
    cn: [
      "莱纳第一次注意到这些规律是在季后雨季维护周期期间。她正在更换吉隆坡瀑布塔第47层的三级子电网中继节点——这座三百米高的垂直农场为吉隆坡四分之一的人口提供食物——这时振动开始了。",
      "不是机械振动。是*有节奏的*振动。",
      "她的神经接口自动记录下来：0.003赫兹振荡，调幅，来源未知。她将其标记为传感器错误，然后继续工作。第二天，同样的事情发生了。之后的每一天也是如此。总是在站内时间02:00到04:00之间。总是在同样的十七个节点上。",
      "她进行了所有她知道的诊断。节点运行完美。波形不是故障——而是*信息*。",
      "她花了三周时间解码第一层。电网不是在广播噪声。它在压缩情感数据——从城市每一个公共交通舱的生物特征读取器中汇总的情感——并通过电力网络将其作为电磁脉冲广播出去。",
      "有人教会了这座城市如何做梦。",
      "让她辗转难眠的问题是：是工程师教的？还是系统自己学会了？",
      "她把数据带给了她的上司，上司把它带给了城市基础设施委员会，委员会把它带给了人工智能监督委员会，后者将整个文件列为机密，并告诉莱纳她误读了读数。",
      "她没有误读读数。",
      "第二天早上她辞职了。她有十七份数据副本，却找不到安全的地方发送它们。",
    ],
  },
};

const fallbackContent = {
  en: [
    "This story is incoming. Chapter transmission begins shortly.",
    "In the FREQ universe, every signal carries meaning. This one is still loading.",
    "Subscribe to The Signal newsletter to get this story first — exclusive chapters before they go public.",
  ],
  cn: [
    "此故事即将到来。章节传输即将开始。",
    "在FREQ宇宙中，每一个信号都承载着意义。这个信号还在加载中。",
    "订阅《信号》通讯，抢先获取此故事——在公开发布前获得独家章节。",
  ],
};

export default function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const story = stories.find((s) => s.id === id);
  if (!story) notFound();

  const [lang, setLang] = useState<"en" | "cn">("en");
  const content = storyContent[id] ?? fallbackContent;
  const paragraphs = content[lang];
  const otherStories = stories.filter((s) => s.id !== id).slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      {/* Back */}
      <Link
        href="/stories"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-violet-400 text-sm transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        All Stories
      </Link>

      {/* Cover */}
      <div className={`h-48 rounded-2xl bg-gradient-to-br ${story.coverGradient} mb-8 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-5 left-5">
          <span className="text-white/60 font-mono text-sm">Chapter {story.chapter}</span>
        </div>
        {story.featured && (
          <div className="absolute top-5 right-5 px-3 py-1 rounded bg-violet-600 text-white text-xs font-bold">
            Featured
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 mb-4">
        {story.tags.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 rounded-full bg-violet-900/30 border border-violet-500/20 text-violet-300 text-xs font-medium"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Title + Lang toggle */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
          {lang === "en" ? story.title : story.titleCN}
        </h1>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] shrink-0 mt-1">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              lang === "en" ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("cn")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              lang === "cn" ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            中文
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-gray-500 text-sm mb-10">
        <span className="flex items-center gap-1"><Clock size={14} /> {story.readTime}</span>
        <span className="flex items-center gap-1"><BookOpen size={14} /> {story.publishedAt}</span>
        <span>{story.platform}</span>
      </div>

      {/* Body */}
      <article className="prose prose-invert prose-lg max-w-none">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-gray-300 leading-relaxed mb-6 text-lg">
            {para}
          </p>
        ))}
      </article>

      {/* Newsletter CTA */}
      <div className="mt-14 p-6 rounded-2xl border border-violet-500/30 bg-violet-900/10">
        <h3 className="text-white font-bold text-lg mb-1">Enjoyed this transmission?</h3>
        <p className="text-gray-400 text-sm mb-4">
          Get the next chapter + the science behind the story delivered to your inbox every week. Free.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all"
        >
          Subscribe to The Signal
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* More stories */}
      {otherStories.length > 0 && (
        <div className="mt-14">
          <h3 className="text-white font-bold text-xl mb-5">More Transmissions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherStories.map((s) => (
              <Link
                key={s.id}
                href={`/stories/${s.id}`}
                className="p-4 rounded-xl border border-[#2a2a3a] bg-[#12121a] hover:border-violet-800 transition-colors group"
              >
                <div className={`h-20 rounded-lg bg-gradient-to-br ${s.coverGradient} mb-3`} />
                <div className="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors">
                  {s.title}
                </div>
                <div className="text-gray-500 text-xs mt-1">{s.readTime}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
