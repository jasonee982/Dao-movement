"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="toast fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1a1a26] border border-emerald-500/50 shadow-xl shadow-black/40 max-w-sm">
      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
      <p className="text-sm text-gray-200 flex-1">{message}</p>
      <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
        <X size={16} />
      </button>
    </div>
  );
}
