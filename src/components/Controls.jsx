import React from 'react';
import { Mic, Play, Square, Download } from 'lucide-react';

export default function Controls({ subtitle, onSubtitleChange, duration, onDurationChange, recording, onStart, onStop, videoURL, error }) {
  return (
    <div className="bg-neutral-900 rounded-2xl border border-neutral-800/60 p-4 space-y-4">
      <div>
        <label className="block text-sm text-neutral-300 mb-2">Subtitle text</label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => onSubtitleChange(e.target.value)}
          className="w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          placeholder="I'm sorry..."
          maxLength={80}
        />
        <p className="text-xs text-neutral-500 mt-1">Shown as a cute speech bubble. Keep it short.</p>
      </div>

      <div>
        <label className="block text-sm text-neutral-300 mb-2">Duration (seconds)</label>
        <input
          type="range"
          min={3}
          max={15}
          step={1}
          value={duration}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-neutral-400"><span>3</span><span>{duration}s</span><span>15</span></div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onStart}
          disabled={recording}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium transition-colors ${recording ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-400 text-neutral-900'}`}
        >
          <Play size={18} /> Record
        </button>
        <button
          onClick={onStop}
          disabled={!recording}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium transition-colors ${!recording ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-400 text-neutral-900'}`}
        >
          <Square size={18} /> Stop
        </button>
      </div>

      <div className="flex items-start gap-3 text-sm">
        <div className={`h-3 w-3 rounded-full mt-1 ${recording ? 'bg-rose-500 animate-pulse' : 'bg-neutral-700'}`} />
        <div>
          <div className="font-medium">Microphone</div>
          <div className="text-neutral-400">We only use your mic while recording to animate the mouth and capture audio.</div>
        </div>
      </div>

      {error && (
        <div className="text-rose-400 text-sm bg-rose-950/40 border border-rose-900/50 px-3 py-2 rounded-lg">{error}</div>
      )}

      {videoURL && (
        <div className="p-3 rounded-xl border border-neutral-800/60 bg-neutral-950">
          <div className="text-sm text-neutral-300 mb-2">Your video is ready</div>
          <video src={videoURL} controls className="w-full rounded-lg border border-neutral-800" />
          <a
            href={videoURL}
            download={`cat-apology-${Date.now()}.webm`}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-900 px-3 py-2 font-medium"
          >
            <Download size={18} /> Download
          </a>
        </div>
      )}

      <div className="text-xs text-neutral-500">
        Tip: Speak near your mic while recording. The cat lip-syncs to your voice and displays the subtitle.
      </div>
    </div>
  );
}
