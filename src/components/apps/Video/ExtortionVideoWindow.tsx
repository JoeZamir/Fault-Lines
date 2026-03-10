import { useEffect, useState } from "react";

export default function ExtortionVideoWindow() {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [prompt, setPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string[]>([]);

  useEffect(() => {
    if (!playing || prompt) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 100 / 60, 100);
        if (next >= 100) {
          setPrompt(true);
          setPlaying(false);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, prompt]);

  const unlock = async () => {
    if (password !== "WINNIEBRENDABENJAMIN") return;
    setStatus(["Unlocking Drive...", "Uploading to cloud...", "Connecting accounts...", "Uploading...", "success!..."]);
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4 text-sm relative">
      <div className="border rounded p-3">Extortion_evidence.mp4</div>
      <div className="h-3 rounded bg-secondary overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
      <div className="text-xs">Timeline: 00:{String(Math.round((progress / 100) * 60)).padStart(2, "0")} / 01:00</div>
      <button onClick={() => setPlaying((p) => !p)} className="px-3 py-1 rounded border self-start">{playing ? "Pause" : "Play"}</button>

      {prompt && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
          <div className="bg-card border rounded p-4 w-80 space-y-2">
            <p>Enter Password:</p>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-2 py-1 bg-secondary" />
            <button onClick={unlock} className="px-3 py-1 rounded bg-primary text-primary-foreground">ENTER</button>
            {status.map((line) => <div key={line} className="text-xs">{line}</div>)}
          </div>
        </div>
      )}
    </div>
  );
}
