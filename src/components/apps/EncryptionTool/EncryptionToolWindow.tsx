import { useState } from "react";
import { simulateEncryption, EncryptionLog } from "@/utils/encryptionSimulator";
import { Eye, EyeOff } from "lucide-react";

const INTERNAL_DRIVES = [
  { id: "C:", label: "C:" },
  { id: "D:", label: "D:" },
];
const EXTERNAL_DRIVES = [
  { id: "A:", label: "A: archive_" },
  { id: "B:", label: "B: USB_key" },
];

export default function EncryptionToolWindow() {
  const [selectedDrive, setSelectedDrive] = useState<string | null>(null);
  const [kekDrive] = useState("B: USB_key");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [encrypting, setEncrypting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<EncryptionLog[]>([]);
  const [done, setDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEncrypt = () => {
    if (!selectedDrive) return;
    setShowPasswordModal(true);
    setPassword("");
    setPasswordError("");
  };

  const handlePasswordSubmit = async () => {
    if (password !== "John 8:32") {
      setPasswordError("Incorrect password");
      return;
    }
    setShowPasswordModal(false);
    setEncrypting(true);
    setLogs([]);
    setProgress(0);
    setDone(false);

    await simulateEncryption((log, prog) => {
      setLogs((prev) => [...prev, log]);
      setProgress(prog);
    });

    setDone(true);
    setEncrypting(false);
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4 text-sm">
      {/* Drive Selection */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Internal Drives</h3>
        <div className="flex gap-2">
          {INTERNAL_DRIVES.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDrive(d.id)}
              className={`px-3 py-2 rounded-lg border transition text-foreground ${
                selectedDrive === d.id ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-3">External Drives</h3>
        <div className="flex gap-2">
          {EXTERNAL_DRIVES.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDrive(d.id)}
              className={`px-3 py-2 rounded-lg border transition text-foreground ${
                selectedDrive === d.id ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleEncrypt}
          disabled={!selectedDrive || encrypting}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium disabled:opacity-40 transition"
        >
          Encrypt
        </button>
        <button
          disabled={encrypting}
          className="px-4 py-2 rounded-lg border border-border text-foreground disabled:opacity-40 hover:bg-secondary transition"
        >
          Decrypt
        </button>
        <span className="text-xs text-muted-foreground">KEK Drive: <span className="text-foreground">{kekDrive}</span></span>
      </div>

      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <input type="checkbox" checked readOnly className="accent-primary" />
        Split Key Encryption
      </label>

      {/* Progress */}
      {(encrypting || done) && (
        <div>
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 mono">{progress}%{done && " — Encryption Complete"}</p>
        </div>
      )}

      {/* Logs */}
      {logs.length > 0 && (
        <div className="flex-1 overflow-auto bg-secondary/30 rounded-lg p-3 mono text-xs space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="text-muted-foreground">
              <span className="text-primary/60">[{log.timestamp.toLocaleTimeString()}]</span> {log.message}
            </div>
          ))}
        </div>
      )}

      {done && (
        <button
          onClick={() => { setDone(false); setLogs([]); setProgress(0); }}
          className="self-end px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
        >
          Done
        </button>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-6 w-72 border border-border shadow-xl animate-window-open">
            <h3 className="text-sm font-semibold text-foreground mb-3">Enter Encryption Password</h3>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                className="w-full px-3 py-2 pr-9 rounded-lg bg-secondary text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                placeholder="Password"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground transition">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordError && <p className="text-destructive text-xs mt-2">{passwordError}</p>}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 py-2 rounded-lg border border-border text-foreground text-sm hover:bg-secondary transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
