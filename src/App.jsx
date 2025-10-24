import React, { useRef, useState } from 'react';
import Header from './components/Header';
import CatCanvas from './components/CatCanvas';
import Controls from './components/Controls';
import Footer from './components/Footer';

export default function App() {
  const canvasRef = useRef(null);
  const [subtitle, setSubtitle] = useState("I'm sorry...");
  const [duration, setDuration] = useState(6);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [error, setError] = useState("");

  const startRecording = async () => {
    setError("");
    try {
      setVideoURL("");
      setRecording(true);
      await canvasRef.current?.startRecording({ seconds: duration });
    } catch (e) {
      setRecording(false);
      setError(e?.message || 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    try {
      await canvasRef.current?.stopRecording();
    } catch (e) {
      setError(e?.message || 'Failed to stop recording');
    } finally {
      setRecording(false);
    }
  };

  const handleComplete = (url) => {
    setRecording(false);
    setVideoURL(url || "");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-neutral-900 rounded-2xl border border-neutral-800/60 overflow-hidden">
          <CatCanvas ref={canvasRef} subtitle={subtitle} onComplete={handleComplete} onError={setError} />
        </section>

        <aside className="lg:col-span-1">
          <Controls
            subtitle={subtitle}
            onSubtitleChange={setSubtitle}
            duration={duration}
            onDurationChange={setDuration}
            recording={recording}
            onStart={startRecording}
            onStop={stopRecording}
            videoURL={videoURL}
            error={error}
          />
        </aside>
      </main>

      <Footer />
    </div>
  );
}
