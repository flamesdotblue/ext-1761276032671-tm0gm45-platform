import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800/60">
      <div className="container mx-auto px-4 py-6 text-sm text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          Built with React, Canvas, and MediaRecorder. No uploads — everything runs in your browser.
        </div>
        <div className="text-neutral-500">Have fun and be kind.</div>
      </div>
    </footer>
  );
}
