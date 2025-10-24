import React, { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';

// Draw a cute cat with a simple mouth that opens based on "openness" value 0..1
function drawCat(ctx, w, h, mouthOpen, subtitle) {
  ctx.clearRect(0, 0, w, h);

  // background
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#0b0b0b');
  grad.addColorStop(1, '#111111');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // subtle vignette
  const vg = ctx.createRadialGradient(w/2, h/2, Math.min(w,h)/6, w/2, h/2, Math.max(w,h)/1.2);
  vg.addColorStop(0, 'rgba(255,255,255,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = vg;
  ctx.fillRect(0,0,w,h);

  // Cat body
  const cx = w/2;
  const cy = h*0.58;
  const headR = Math.min(w,h)*0.22;

  // body
  ctx.fillStyle = '#f3f4f6';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(cx, cy+headR*1.1, headR*1.15, headR*1.35, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.stroke();

  // head
  ctx.beginPath();
  ctx.arc(cx, cy-headR*0.7, headR, 0, Math.PI*2);
  ctx.fillStyle = '#e5e7eb';
  ctx.fill();
  ctx.stroke();

  // ears
  const earH = headR*0.85;
  const earW = headR*0.9;
  ctx.beginPath();
  ctx.moveTo(cx - earW*0.6, cy - headR*0.7 - headR*0.2);
  ctx.lineTo(cx - earW, cy - headR*0.7 + earH*0.05);
  ctx.lineTo(cx - earW*0.15, cy - headR*0.7 + earH*0.05);
  ctx.closePath();
  ctx.fillStyle = '#e5e7eb';
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx + earW*0.6, cy - headR*0.7 - headR*0.2);
  ctx.lineTo(cx + earW, cy - headR*0.7 + earH*0.05);
  ctx.lineTo(cx + earW*0.15, cy - headR*0.7 + earH*0.05);
  ctx.closePath();
  ctx.fillStyle = '#e5e7eb';
  ctx.fill();
  ctx.stroke();

  // inner ears
  ctx.fillStyle = '#f9a8d4';
  ctx.beginPath();
  ctx.moveTo(cx - earW*0.6, cy - headR*0.7 - headR*0.12);
  ctx.lineTo(cx - earW*0.78, cy - headR*0.7 + earH*0.05);
  ctx.lineTo(cx - earW*0.25, cy - headR*0.7 + earH*0.0);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx + earW*0.6, cy - headR*0.7 - headR*0.12);
  ctx.lineTo(cx + earW*0.78, cy - headR*0.7 + earH*0.05);
  ctx.lineTo(cx + earW*0.25, cy - headR*0.7 + earH*0.0);
  ctx.closePath();
  ctx.fill();

  // eyes
  const eyeY = cy - headR*0.9;
  const eyeDX = headR*0.45;
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx - eyeDX, eyeY, headR*0.12, 0, Math.PI*2);
  ctx.arc(cx + eyeDX, eyeY, headR*0.12, 0, Math.PI*2);
  ctx.fill();

  // eye shine
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(cx - eyeDX - headR*0.03, eyeY - headR*0.04, headR*0.035, 0, Math.PI*2);
  ctx.arc(cx + eyeDX - headR*0.03, eyeY - headR*0.04, headR*0.035, 0, Math.PI*2);
  ctx.fill();

  // nose
  ctx.fillStyle = '#fda4af';
  ctx.beginPath();
  ctx.moveTo(cx, cy - headR*0.6);
  ctx.lineTo(cx - headR*0.055, cy - headR*0.53);
  ctx.lineTo(cx + headR*0.055, cy - headR*0.53);
  ctx.closePath();
  ctx.fill();

  // mouth
  const mTopY = cy - headR*0.48;
  const mOpen = Math.max(0, Math.min(1, mouthOpen));
  const mouthH = headR*0.08 + mOpen*headR*0.18;
  const mouthW = headR*0.3 + mOpen*headR*0.05;

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(cx, mTopY + mouthH/2, mouthW, mouthH/2, 0, 0, Math.PI*2);
  ctx.fill();

  // whiskers
  ctx.strokeStyle = 'rgba(2,6,23,0.8)';
  ctx.lineWidth = 2;
  const wy = mTopY - headR*0.04;
  for (let i=0;i<3;i++) {
    const off = i*headR*0.06;
    ctx.beginPath();
    ctx.moveTo(cx - headR*0.15, wy + off);
    ctx.lineTo(cx - headR*0.55, wy + off - headR*0.03);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + headR*0.15, wy + off);
    ctx.lineTo(cx + headR*0.55, wy + off - headR*0.03);
    ctx.stroke();
  }

  // paws
  ctx.fillStyle = '#e5e7eb';
  const pawY = cy + headR*1.6;
  const pawXoff = headR*0.5;
  ctx.beginPath();
  ctx.ellipse(cx - pawXoff, pawY, headR*0.28, headR*0.14, 0, 0, Math.PI*2);
  ctx.ellipse(cx + pawXoff, pawY, headR*0.28, headR*0.14, 0, 0, Math.PI*2);
  ctx.fill();

  // subtitle
  if (subtitle) {
    const pad = 16;
    ctx.font = `600 ${Math.floor(Math.min(w,h)*0.05)}px Inter, system-ui, -apple-system, Segoe UI, Roboto`;
    const text = subtitle;
    const metrics = ctx.measureText(text);
    const textW = metrics.width;
    const boxW = textW + pad*2;
    const boxH = Math.min(64, Math.max(40, Math.floor(Math.min(w,h)*0.09)));
    const bx = (w - boxW)/2;
    const by = h - boxH - 24;

    // bubble
    const radius = 14;
    ctx.fillStyle = 'rgba(17,24,39,0.8)';
    ctx.strokeStyle = 'rgba(148,163,184,0.5)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, bx, by, boxW, boxH, radius);
    ctx.fill();
    ctx.stroke();

    // text
    ctx.fillStyle = '#e5e7eb';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(text, w/2, by + boxH/2 + 1);
  }
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = typeof r === 'number' ? {tl:r,tr:r,br:r,bl:r} : r;
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + w - radius.tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius.tr);
  ctx.lineTo(x + w, y + h - radius.br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius.br, y + h);
  ctx.lineTo(x + radius.bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
}

const CatCanvas = forwardRef(function CatCanvas({ subtitle, onComplete, onError }, ref) {
  const canvasRef = useRef(null);
  const animRef = useRef(0);
  const analyserRef = useRef(null);
  const dataRef = useRef(null);
  const streamsRef = useRef({ mic: null, rec: null, canvas: null });
  const chunksRef = useRef([]);
  const recorderRef = useRef(null);
  const openRef = useRef(0);
  const startTimeRef = useRef(0);
  const durationRef = useRef(0);

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.max(480, Math.floor(rect.width));
    const h = Math.floor(w * 9 / 16);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
  };

  useEffect(() => {
    resize();
    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    let raf;
    const loop = (t) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      // update mouth openness
      let openness = 0.05 + 0.02 * Math.sin(t/200);
      const analyser = analyserRef.current;
      if (analyser && dataRef.current) {
        analyser.getByteTimeDomainData(dataRef.current);
        let sum = 0;
        for (let i=0;i<dataRef.current.length;i+=4) {
          const v = (dataRef.current[i] - 128) / 128;
          sum += Math.abs(v);
        }
        const avg = sum / (dataRef.current.length/4);
        // map avg amplitude to 0..1
        const boost = Math.min(1, avg * 6);
        openness = Math.max(openness, boost);
      }

      // smooth
      openRef.current = openRef.current * 0.7 + openness * 0.3;

      drawCat(ctx, w, h, openRef.current, subtitle);

      // auto stop if timed recording
      if (recorderRef.current && durationRef.current > 0) {
        const elapsed = (performance.now() - startTimeRef.current) / 1000;
        if (elapsed >= durationRef.current) {
          stopRecordingInternal();
        }
      }

      raf = requestAnimationFrame(loop);
      animRef.current = raf;
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [subtitle]);

  async function startRecordingInternal(seconds) {
    if (recorderRef.current) return;
    try {
      // mic
      const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamsRef.current.mic = mic;

      // analyser for lipsync
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const source = ctx.createMediaStreamSource(mic);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);
      analyserRef.current = analyser;
      dataRef.current = new Uint8Array(analyser.frequencyBinCount);

      // canvas stream
      const canvas = canvasRef.current;
      const fps = 30;
      const canvasStream = canvas.captureStream(fps);
      streamsRef.current.canvas = canvasStream;

      // combine
      const combined = new MediaStream([
        ...canvasStream.getVideoTracks(),
        ...mic.getAudioTracks(),
      ]);

      const rec = new MediaRecorder(combined, { mimeType: 'video/webm;codecs=vp9,opus' });
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        onComplete?.(url);
        // cleanup mic only after providing result
        cleanupStreams();
      };
      rec.onerror = (e) => onError?.(e.error?.message || 'Recording error');

      recorderRef.current = rec;
      streamsRef.current.rec = combined;
      durationRef.current = seconds || 0;
      startTimeRef.current = performance.now();
      rec.start();
    } catch (e) {
      onError?.(e?.message || 'Microphone permission is required to record audio');
      cleanupStreams();
      throw e;
    }
  }

  function stopRecordingInternal() {
    const rec = recorderRef.current;
    if (!rec) return;
    try {
      rec.stop();
    } catch {}
    recorderRef.current = null;
    durationRef.current = 0;
  }

  function cleanupStreams() {
    try {
      streamsRef.current.mic?.getTracks().forEach(t => t.stop());
      streamsRef.current.canvas?.getTracks().forEach(t => t.stop());
    } catch {}
    streamsRef.current = { mic: null, rec: null, canvas: null };
    analyserRef.current = null;
    dataRef.current = null;
  }

  useImperativeHandle(ref, () => ({
    startRecording: ({ seconds } = {}) => startRecordingInternal(seconds),
    stopRecording: () => stopRecordingInternal(),
  }));

  useEffect(() => () => cleanupStreams(), []);

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="block w-full h-auto aspect-video bg-black" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_70%)]" />
      <div className="absolute top-3 left-3 text-xs text-neutral-400 bg-neutral-900/60 px-2 py-1 rounded-md border border-neutral-800/60">Grant microphone access and speak “I’m sorry” while recording</div>
    </div>
  );
});

export default CatCanvas;
