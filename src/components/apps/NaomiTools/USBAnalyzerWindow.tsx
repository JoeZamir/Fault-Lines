import { useState } from "react";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function USBAnalyzerWindow() {
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const runAnalysis = async () => {
    setRunning(true);
    setLogs([]);
    const entries = [
      "analysing drive...",
      "examining encryption hash...",
      "determining encryption type...",
      "success, key split encryption...",
      "KEK detected on vault_key",
    ];
    for (const entry of entries) {
      setLogs((prev) => [...prev, entry]);
      await sleep(800);
    }
    setRunning(false);
  };

  return (
    <div className="p-4 h-full text-sm flex flex-col gap-4">
      <section className="border border-border rounded-lg p-3 space-y-2">
        <h3 className="font-semibold">General Properties</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-muted-foreground">Drive</div><div>A: archive_</div><div>vault_archive</div>
          <div className="text-muted-foreground">Used / Free</div><div>42.5 GB</div><div>21.5 GB</div>
          <div className="text-muted-foreground">Capacity</div><div>68719476736 bytes</div><div>64 GB</div>
        </div>
        <p className="text-xs">Type: Removable</p>
        <p className="text-xs">File system: ntfs</p>
      </section>

      <section className="border border-border rounded-lg p-3 flex-1 flex flex-col gap-2">
        <button onClick={runAnalysis} disabled={running} className="self-start px-3 py-1.5 rounded bg-primary text-primary-foreground disabled:opacity-40">
          Analyze
        </button>
        <div className="flex-1 bg-secondary/30 rounded p-2 overflow-auto font-mono text-xs">
          {logs.map((line, idx) => <div key={`${line}-${idx}`}>{line}</div>)}
        </div>
      </section>
    </div>
  );
}
