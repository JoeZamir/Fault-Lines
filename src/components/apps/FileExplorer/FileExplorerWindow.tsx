import { useEffect, useMemo, useRef, useState } from "react";
import { FILE_SYSTEM, ENCRYPTED_DRIVES, FSNode } from "@/utils/fileSystem";
import PasswordModal from "./PasswordModal";
import { Folder, File, HardDrive, ArrowLeft, ArrowRight, Home, Download, FileText, Image, Music, Video, Plus } from "lucide-react";
import { useDesktop } from "@/context/DesktopContext";

interface HistoryEntry { path: string[]; driveKey: string }

const quickAccess = [
  { icon: Home, label: "Home" },
  { icon: Download, label: "Downloads" },
  { icon: FileText, label: "Documents" },
  { icon: Image, label: "Pictures" },
  { icon: Music, label: "Music" },
  { icon: Video, label: "Videos" },
];

const NAOMI_DRIVE_A: FSNode = {
  folders: ["Insurance", "manipulation", "Extortion"],
  files: [],
  children: {
    Insurance: {
      folders: ["_fraud_docs"],
      files: [],
      children: {
        _fraud_docs: {
          folders: [],
          files: ["85ad2_claim.pdf", "nq77_audit.docx", "delta-report-9.pdf", "ledger-xt12.doc"],
        },
      },
    },
    manipulation: {
      folders: ["_tapes"],
      files: [],
      children: {
        _tapes: {
          folders: [],
          files: ["TS_001_094503.mp4", "tape-07-raw.mp4", "m-clip-893.mp4"],
        },
      },
    },
    Extortion: {
      folders: [],
      files: ["_evidence.mp4"],
    },
  },
};

export default function FileExplorerWindow({ startInMyPc = false }: { startInMyPc?: boolean }) {
  const { user, openWindow } = useDesktop();
  const [currentDrive, setCurrentDrive] = useState<string | null>(startInMyPc ? "C" : null);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [pendingDrive, setPendingDrive] = useState<string | null>(null);
  const [unlockedDrives, setUnlockedDrives] = useState<Set<string>>(new Set(user?.username === "Naomi" ? ["A: archive_"] : []));
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const popupTimers = useRef<number[]>([]);

  const drives = useMemo(() => (user?.username === "Naomi" ? [...Object.keys(FILE_SYSTEM), "B: USB_key"] : Object.keys(FILE_SYSTEM)), [user?.username]);

  const fileSystem = useMemo(() => {
    if (user?.username !== "Naomi") return FILE_SYSTEM;
    return {
      ...FILE_SYSTEM,
      "A: archive_": NAOMI_DRIVE_A,
    };
  }, [user?.username]);

  const clearPopupTimers = () => {
    popupTimers.current.forEach((timer) => window.clearTimeout(timer));
    popupTimers.current = [];
  };

  useEffect(() => clearPopupTimers, []);

  const queuePopups = (items: { type: string; title: string }[]) => {
    clearPopupTimers();
    items.forEach((item, index) => {
      const timer = window.setTimeout(() => openWindow(item.type, item.title), index * 1200);
      popupTimers.current.push(timer);
    });
  };

  const navigateTo = (driveKey: string, path: string[]) => {
    setCurrentDrive(driveKey);
    setCurrentPath(path);
    const entry = { path, driveKey };
    const newHistory = [...history.slice(0, historyIndex + 1), entry];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleDriveClick = (driveKey: string) => {
    if (driveKey === "B: USB_key") return;
    if (ENCRYPTED_DRIVES.includes(driveKey) && !unlockedDrives.has(driveKey)) {
      setPendingDrive(driveKey);
      setShowPassword(true);
      return;
    }
    navigateTo(driveKey, []);
  };

  const handleUnlock = () => {
    if (!pendingDrive) return;
    setUnlockedDrives((prev) => new Set(prev).add(pendingDrive));
    setShowPassword(false);
    navigateTo(pendingDrive, []);

    if (user?.username === "Titus") {
      queuePopups(Array.from({ length: 8 }, (_, i) => ({
        type: "decryptedEvidence",
        title: `Folder_${(i + 1).toString().padStart(2, "0")}`,
      })));
    }

    if (user?.username === "Naomi") {
      queuePopups([
        { type: "decryptedEvidence", title: "Insurance/_fraud_docs" },
        { type: "decryptedEvidence", title: "manipulation/_tapes" },
        { type: "decryptedEvidence", title: "Extortion" },
        { type: "videoEvidence", title: "_evidence.mp4" },
      ]);
    }

    setPendingDrive(null);
  };

  const getCurrentNode = (): FSNode | null => {
    if (!currentDrive || currentDrive === "B: USB_key") return null;
    let node = fileSystem[currentDrive];
    if (!node) return null;
    for (const segment of currentPath) {
      node = node.children?.[segment] as FSNode;
      if (!node) return null;
    }
    return node;
  };


  const goBack = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentDrive(prev.driveKey);
      setCurrentPath(prev.path);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentDrive(next.driveKey);
      setCurrentPath(next.path);
    }
  };
  const node = getCurrentNode();
  const addressBar = currentDrive ? `${currentDrive}:/${currentPath.join("/")}` : "Home";

  return (
    <div className="h-full flex flex-col text-sm relative">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-secondary/30">
        <button onClick={goBack} disabled={historyIndex <= 0} className="p-1 rounded hover:bg-secondary disabled:opacity-30"><ArrowLeft className="w-4 h-4" /></button>
        <button onClick={goForward} disabled={historyIndex >= history.length - 1} className="p-1 rounded hover:bg-secondary disabled:opacity-30"><ArrowRight className="w-4 h-4" /></button>
        <div className="flex-1 px-3 py-1.5 bg-secondary rounded-lg mono text-xs truncate">{addressBar}</div>
        <button className="text-xs px-2 py-1 rounded border border-border flex items-center gap-1"><Plus className="w-3 h-3" /> New</button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-48 border-r border-border p-2 space-y-3 overflow-auto">
          <div>
            <p className="text-[10px] uppercase text-muted-foreground">Quick access</p>
            {quickAccess.map((q) => <div key={q.label} className="flex items-center gap-2 px-1 py-1 text-xs"><q.icon className="w-3 h-3" />{q.label}</div>)}
          </div>
          <div>
            <p className="text-[10px] uppercase text-muted-foreground">My PC</p>
            {drives.map((d) => (
              <button key={d} onClick={() => handleDriveClick(d)} className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs ${currentDrive === d ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}>
                <HardDrive className="w-3.5 h-3.5" />{d}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-3 overflow-auto">
          {!currentDrive && (
            <>
              <h4 className="text-xs font-semibold mb-2">Quick access</h4>
              <div className="grid grid-cols-3 gap-2 mb-4">{quickAccess.map((q) => <div key={q.label} className="desktop-icon-btn"><q.icon className="w-8 h-8 text-primary" /><span className="text-xs">{q.label}</span></div>)}</div>
              <h4 className="text-xs font-semibold mb-2">Recent</h4>
              <div className="text-xs text-muted-foreground">report.pdf, archive.sig, notes.txt</div>
            </>
          )}
          {currentDrive === "B: USB_key" && <p className="text-xs text-muted-foreground">vault_key mounted. Use terminal tools for decryption.</p>}
          {currentDrive && node && (
            <div className="grid grid-cols-4 gap-2">
              {node.folders?.map((folder) => (
                <button key={folder} onDoubleClick={() => navigateTo(currentDrive, [...currentPath, folder])} className="desktop-icon-btn">
                  <Folder className="w-8 h-8 text-primary" /><span className="text-xs">{folder}</span>
                </button>
              ))}
              {node.files?.map((file) => (
                <button
                  key={file}
                  onDoubleClick={() => file === "_evidence.mp4" && openWindow("videoEvidence", "_evidence.mp4")}
                  className="desktop-icon-btn"
                >
                  <File className="w-8 h-8 text-muted-foreground" /><span className="text-xs">{file}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {showPassword && <PasswordModal onSuccess={handleUnlock} onCancel={() => { setShowPassword(false); setPendingDrive(null); }} />}
    </div>
  );
}
