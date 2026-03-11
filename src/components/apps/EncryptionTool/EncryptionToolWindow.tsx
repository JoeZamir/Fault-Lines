import { useEffect, useMemo, useRef, useState } from "react";
import { simulateEncryption, EncryptionLog } from "@/utils/encryptionSimulator";
import { Eye, EyeOff, HardDrive, LockKeyhole, Shield, Unlock } from "lucide-react";

const LOCAL_DRIVES = [
  { id: "C:", label: "Local Disk C", selectable: false },
  { id: "D:", label: "New Volume D", selectable: true },
];

const EXTERNAL_DRIVES = [
  { id: "A:", label: "A: Faultline", selectable: true },
  { id: "B:", label: "B: Corsair USB", selectable: true },
];

function getPasswordStrength(password: string) {
  if (password.length < 6) return { label: "Too short", color: "text-red-400" };
  if (password.length < 10) return { label: "Fair", color: "text-yellow-300" };
  return { label: "Strong", color: "text-emerald-300" };
}

export default function EncryptionToolWindow() {
  const [selectedDrive, setSelectedDrive] = useState<string | null>(null);
  const [kekDrive, setKekDrive] = useState("B: Corsair USB");
  const [splitKeyEnabled, setSplitKeyEnabled] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [encrypting, setEncrypting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<EncryptionLog[]>([]);
  const [done, setDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLocalDrives, setShowLocalDrives] = useState(true);
  const [showExternalDrives, setShowExternalDrives] = useState(true);
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  useEffect(() => {
    if (!logContainerRef.current) return;
    logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
  }, [logs]);

  const handleEncrypt = () => {
    if (!selectedDrive || encrypting) return;
    setShowPasswordModal(true);
    setPassword("");
  };

  const handlePasswordSubmit = async () => {
    setShowPasswordModal(false);
    setEncrypting(true);
    setLogs([]);
    setProgress(0);
    setDone(false);

    await simulateEncryption((log, prog) => {
      setLogs((prev) => [...prev, log]);
      setProgress(prog);
    }, { splitKeyEnabled });

    setDone(true);
    setEncrypting(false);
  };

  const clearRun = () => {
    setDone(false);
    setLogs([]);
    setProgress(0);
  };

  return (
    <div className="relative h-full bg-slate-900 text-slate-100 p-4 flex flex-col gap-4">
      <div className="flex items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-indigo-600/40 border border-cyan-300/30 flex items-center justify-center shadow-inner">
          <Shield className="w-8 h-8 text-cyan-200" />
          <LockKeyhole className="w-4 h-4 text-indigo-200 -ml-3 mt-4" />
        </div>
        <h2 className="text-2xl font-semibold text-cyan-100 tracking-wide">Drive Crypt</h2>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-cyan-200/90 uppercase tracking-wider mb-2">Devices & Drives</h3>
        <div className="w-4/5 mx-auto rounded-xl bg-slate-800/90 border border-cyan-400/20 p-3 min-h-[220px] space-y-2">
          <div>
            <button
              onClick={() => setShowLocalDrives((prev) => !prev)}
              className="w-full text-left text-xs font-semibold tracking-wider text-cyan-200 hover:text-cyan-100"
            >
              LOCAL DRIVES
            </button>
            {showLocalDrives && (
              <div className="pt-2 pl-2 space-y-2">
                {LOCAL_DRIVES.map((drive) => (
                  <button
                    key={drive.id}
                    onClick={() => drive.selectable && setSelectedDrive(drive.id)}
                    disabled={!drive.selectable || encrypting}
                    className={`w-full flex items-center gap-2 rounded-md px-2 py-1.5 border text-sm transition ${
                      !drive.selectable
                        ? "opacity-40 cursor-not-allowed border-slate-600"
                        : selectedDrive === drive.id
                          ? "border-cyan-300 bg-cyan-500/20"
                          : "border-slate-600 hover:bg-slate-700"
                    }`}
                  >
                    <HardDrive className="w-4 h-4 text-cyan-200" />
                    <span>{drive.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setShowExternalDrives((prev) => !prev)}
              className="w-full text-left text-xs font-semibold tracking-wider text-cyan-200 hover:text-cyan-100"
            >
              EXTERNAL DRIVES
            </button>
            {showExternalDrives && (
              <div className="pt-2 pl-2 space-y-2">
                {EXTERNAL_DRIVES.map((drive) => (
                  <button
                    key={drive.id}
                    onClick={() => setSelectedDrive(drive.id)}
                    disabled={encrypting}
                    className={`w-full flex items-center gap-2 rounded-md px-2 py-1.5 border text-sm transition ${
                      selectedDrive === drive.id
                        ? "border-cyan-300 bg-cyan-500/20"
                        : "border-slate-600 hover:bg-slate-700"
                    }`}
                  >
                    <HardDrive className="w-4 h-4 text-cyan-200" />
                    <span>{drive.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-start justify-center gap-6">
        <div className="flex flex-col gap-2">
          <button
            onClick={handleEncrypt}
            disabled={!selectedDrive || encrypting}
            className="w-28 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold disabled:opacity-40"
          >
            <LockKeyhole className="w-4 h-4" /> Encrypt
          </button>
          <button
            disabled={encrypting}
            className="w-28 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-cyan-300/40 text-cyan-100 disabled:opacity-40"
          >
            <Unlock className="w-4 h-4" /> Decrypt
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={splitKeyEnabled}
              onChange={(e) => setSplitKeyEnabled(e.target.checked)}
              className="accent-cyan-400"
            />
            Split Key Encryption
          </label>
          <div>
            <p className="text-xs text-cyan-200/90 mb-1">Choose KEK Drive</p>
            <select
              value={kekDrive}
              onChange={(e) => setKekDrive(e.target.value)}
              disabled={!splitKeyEnabled || encrypting}
              className="w-40 rounded-md px-2 py-1.5 bg-slate-800 border border-slate-600 text-slate-100 disabled:opacity-40"
            >
              <option value="">drive</option>
              <option value="B: Corsair USB">B: Corsair USB</option>
            </select>
          </div>
        </div>
      </div>

      {logs.length > 0 && (
        <div ref={logContainerRef} className="h-36 overflow-auto rounded-xl border border-cyan-400/20 bg-slate-800/80 p-3 text-xs space-y-1 mono">
          {logs.map((log, i) => (
            <div key={`${log.timestamp.toISOString()}-${i}`} className="text-slate-300">
              <span className="text-cyan-300/70">[{log.timestamp.toLocaleTimeString()}]</span> {log.message}
            </div>
          ))}
        </div>
      )}

      {(encrypting || done) && (
        <div>
          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {done && (
        <button
          onClick={clearRun}
          className="self-end px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold"
        >
          Done
        </button>
      )}

      {showPasswordModal && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 w-80 border border-cyan-400/30 shadow-xl animate-window-open">
            <h3 className="text-sm font-semibold text-cyan-100 mb-3">Choose Strong Password</h3>
            <div className="relative">
              <span className={`absolute left-3 top-2.5 text-xs ${strength.color}`}>{strength.label}</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-20 pr-9 py-2 rounded-lg bg-slate-800 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-300/50 text-sm"
                placeholder="Password"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-100 transition">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 py-2 rounded-lg border border-slate-600 text-slate-100 text-sm hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 py-2 rounded-lg bg-cyan-500 text-slate-950 text-sm font-semibold"
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
