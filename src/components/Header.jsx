import React from 'react';
import { Video, Mic, Cat } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-neutral-800/60 bg-neutral-950/60 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-pink-500 grid place-items-center">
            <Cat className="text-neutral-950" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Apawlogy Studio</h1>
            <p className="text-neutral-400 text-sm">Make a video of a cat saying sorry</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-neutral-400">
          <div className="flex items-center gap-2"><Video size={18} /><span className="text-sm">WebM</span></div>
          <div className="flex items-center gap-2"><Mic size={18} /><span className="text-sm">Mic-powered lipsync</span></div>
        </div>
      </div>
    </header>
  );
}
