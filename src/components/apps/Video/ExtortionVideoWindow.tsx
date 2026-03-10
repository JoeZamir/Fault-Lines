import { useEffect, useState } from "react";
import { Pause, Play, Rewind, FastForward } from "lucide-react";

const DURATION_SECONDS = 60;

export default function ExtortionVideoWindow() {
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!playing || elapsed >= DURATION_SECONDS) return;
    const timer = setInterval(() => {
      setElapsed((prev) => Math.min(prev + 1, DURATION_SECONDS));
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, elapsed]);

  const seek = (delta: number) => {
    setElapsed((prev) => Math.max(0, Math.min(prev + delta, DURATION_SECONDS)));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const progress = (elapsed / DURATION_SECONDS) * 100;

  return (
    <div className="h-full flex flex-col bg-card text-foreground rounded-md overflow-hidden border border-border">
      <div className="flex-1 bg-secondary/70 flex items-center justify-center relative">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium">_evidence.mp4</p>
          <p className="text-xs text-muted-foreground">Video evidence playback</p>
        </div>
      </div>

      <div className="border-t border-border bg-secondary/40 px-4 py-3 space-y-2">
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatTime(elapsed)}</span>
          <span>{formatTime(DURATION_SECONDS)}</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => seek(-10)} className="p-2 rounded hover:bg-secondary" aria-label="Seek backward 10 seconds">
            <Rewind className="w-4 h-4" />
          </button>
          <button onClick={() => setPlaying((p) => !p)} className="p-2 rounded-full bg-primary text-primary-foreground" aria-label={playing ? "Pause" : "Play"}>
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button onClick={() => seek(10)} className="p-2 rounded hover:bg-secondary" aria-label="Seek forward 10 seconds">
            <FastForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
