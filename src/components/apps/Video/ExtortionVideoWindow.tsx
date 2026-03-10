import { useEffect, useState } from "react";
import { Pause, Play, Rewind, FastForward, Eye, EyeOff } from "lucide-react";

const DURATION_SECONDS = 60;
const FINAL_CHALLENGE_PASSWORD = "WINNIEBRENDABENJAMIN";
const UPLOAD_LOGS = [
  "Unlocking Drive...",
  "Uploading to cloud...",
  "Connecting social accounts...",
  "Uploading...",
  "success!",
];

export default function ExtortionVideoWindow() {
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [challengePassword, setChallengePassword] = useState("");
  const [showChallengePassword, setShowChallengePassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showUploadStatus, setShowUploadStatus] = useState(false);
  const [visibleUploadLogs, setVisibleUploadLogs] = useState(0);

  useEffect(() => {
    if (!playing || elapsed >= DURATION_SECONDS) return;
    const timer = setInterval(() => {
      setElapsed((prev) => Math.min(prev + 1, DURATION_SECONDS));
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, elapsed]);

  useEffect(() => {
    if (elapsed >= DURATION_SECONDS) {
      setPlaying(false);
      setShowPasswordPrompt(true);
    }
  }, [elapsed]);

  useEffect(() => {
    if (!showUploadStatus) {
      setVisibleUploadLogs(0);
      return;
    }

    const timeout = setTimeout(() => {
      setVisibleUploadLogs((prev) => {
        if (prev >= UPLOAD_LOGS.length) return prev;
        return prev + 1;
      });
    }, 4000);

    return () => clearTimeout(timeout);
  }, [showUploadStatus, visibleUploadLogs]);

  const seek = (delta: number) => {
    setElapsed((prev) => Math.max(0, Math.min(prev + delta, DURATION_SECONDS)));
  };

  const handlePasswordSubmit = () => {
    if (challengePassword !== FINAL_CHALLENGE_PASSWORD) {
      setPasswordError("Incorrect password");
      return;
    }

    setPasswordError("");
    setShowPasswordPrompt(false);
    setShowUploadStatus(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const progress = (elapsed / DURATION_SECONDS) * 100;

  return (
    <div className="h-full flex flex-col bg-card text-foreground rounded-md overflow-hidden border border-border relative">
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

      {showPasswordPrompt && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-md border border-border bg-card p-4 shadow-xl">
            <p className="text-sm font-semibold mb-2">Enter Password:</p>
            <div className="relative">
              <input
                type={showChallengePassword ? "text" : "password"}
                value={challengePassword}
                onChange={(e) => {
                  setChallengePassword(e.target.value);
                  setPasswordError("");
                }}
                className="w-full h-9 rounded border border-input bg-background px-2 pr-9 text-sm"
                placeholder="password"
              />
              <button
                type="button"
                onClick={() => setShowChallengePassword((show) => !show)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                aria-label={showChallengePassword ? "Hide password" : "Show password"}
              >
                {showChallengePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordError && <p className="text-xs text-destructive mt-2">{passwordError}</p>}
            <button
              onClick={handlePasswordSubmit}
              className="mt-3 h-9 px-4 rounded bg-primary text-primary-foreground text-sm"
            >
              ENTER
            </button>
          </div>
        </div>
      )}

      {showUploadStatus && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-md border border-border bg-card p-4 shadow-xl space-y-2">
            <h1 className="text-xl text-primary">Uploading Content...</h1>
            {UPLOAD_LOGS.slice(0, visibleUploadLogs).map((log) => (
              <p key={log} className="text-sm">{log}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
