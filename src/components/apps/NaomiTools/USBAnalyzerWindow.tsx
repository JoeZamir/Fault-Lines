import { useEffect, useRef, useState } from "react";
import { Search, Usb } from "lucide-react";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const ANALYSIS_LOGS = [
  "initiating analysis...",
  "analyzing Drive A...",
  "Examining encryption hash...",
  "Determining encryption type...",
  "Split Key encryption detected...",
  "Encryption key necessary for decryption",
  "Analysis complete...",
];

export default function USBAnalyzerWindow() {
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [driveSelected, setDriveSelected] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const runAnalysis = async () => {
    if (!driveSelected || running) return;

    setRunning(true);
    setLogs([]);

    for (const entry of ANALYSIS_LOGS) {
      setLogs((prev) => [...prev, entry]);
      await sleep(2000);
    }

    setRunning(false);
  };

  return (
    <div className="h-full text-sm flex flex-col gap-4 bg-gradient-to-b from-[#2f0f47] to-[#170825] text-[#ffe7a9] p-4">
      <div className="flex items-center justify-center gap-3 py-1">
        <div className="relative w-9 h-9 text-[#ffb703]">
          <Usb className="w-full h-full" />
          <Search className="w-4 h-4 absolute -right-1 -bottom-1 bg-[#2f0f47] rounded-full p-0.5" />
        </div>
        <h2 className="text-lg font-semibold tracking-wide text-[#ffb703]">USB analyzer</h2>
      </div>

      <section className="rounded-lg p-3 space-y-3 bg-[#3d155d] border border-[#ffb703]/40">
        <h3 className="font-semibold text-[#ffd166]">General Properties</h3>
        <div className="grid grid-cols-6 gap-2 text-xs">
          {[
            "Drive",
            "Used",
            "Free",
            "Capacity",
            "Type",
            "File System",
          ].map((header) => (
            <div key={header} className="text-[#ffdf91] font-semibold">{header}</div>
          ))}

          <button
            type="button"
            onClick={() => setDriveSelected((prev) => !prev)}
            className={`rounded px-2 py-1 text-left flex items-center gap-1.5 border ${
              driveSelected ? "bg-[#ffb703]/20 border-[#ffb703]" : "bg-[#2b0f42] border-[#74489b]"
            }`}
          >
            <Usb className="w-3.5 h-3.5" />
            A:
          </button>
          <div className="py-1">42.5 GB</div>
          <div className="py-1">21.5 GB</div>
          <div className="py-1">64 GB</div>
          <div className="py-1">removable</div>
          <div className="py-1">ntfs</div>
        </div>
      </section>

      <section className="rounded-lg p-3 flex-1 flex flex-col gap-2 bg-[#3d155d] border border-[#ffb703]/40 min-h-0">
        <button
          onClick={runAnalysis}
          disabled={running || !driveSelected}
          className="self-start px-3 py-1.5 rounded bg-[#ffb703] text-[#2f0f47] font-semibold disabled:opacity-40"
        >
          Analyze
        </button>
        <div ref={logContainerRef} className="flex-1 bg-[#1f092f] rounded p-2 overflow-auto font-mono text-xs border border-[#74489b]">
          {logs.map((line, idx) => <div key={`${line}-${idx}`}>{line}</div>)}
        </div>
      </section>
    </div>
  );
}
