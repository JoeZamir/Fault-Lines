import { useState } from "react";
import { FILE_SYSTEM, ENCRYPTED_DRIVES, FSNode } from "@/utils/fileSystem";
import PasswordModal from "./PasswordModal";
import { Folder, File, HardDrive, ArrowLeft, ArrowRight } from "lucide-react";

interface HistoryEntry {
  path: string[];
  driveKey: string;
}

export default function FileExplorerWindow() {
  const [currentDrive, setCurrentDrive] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [pendingDrive, setPendingDrive] = useState<string | null>(null);
  const [unlockedDrives, setUnlockedDrives] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const navigateTo = (driveKey: string, path: string[]) => {
    setCurrentDrive(driveKey);
    setCurrentPath(path);
    const entry = { path, driveKey };
    const newHistory = [...history.slice(0, historyIndex + 1), entry];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleDriveClick = (driveKey: string) => {
    if (ENCRYPTED_DRIVES.includes(driveKey) && !unlockedDrives.has(driveKey)) {
      setPendingDrive(driveKey);
      setShowPassword(true);
      return;
    }
    navigateTo(driveKey, []);
  };

  const handleUnlock = () => {
    if (pendingDrive) {
      setUnlockedDrives((prev) => new Set(prev).add(pendingDrive));
      setShowPassword(false);
      navigateTo(pendingDrive, []);
      setPendingDrive(null);
    }
  };

  const getCurrentNode = (): FSNode | null => {
    if (!currentDrive) return null;
    let node = FILE_SYSTEM[currentDrive];
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
  const drives = Object.keys(FILE_SYSTEM);
  const addressBar = currentDrive ? `${currentDrive}:/${currentPath.join("/") + (currentPath.length ? "/" : "")}` : "";

  return (
    <div className="h-full flex flex-col text-sm relative">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-secondary/30">
        <button onClick={goBack} disabled={historyIndex <= 0} className="p-1 rounded hover:bg-secondary disabled:opacity-30 transition">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <button onClick={goForward} disabled={historyIndex >= history.length - 1} className="p-1 rounded hover:bg-secondary disabled:opacity-30 transition">
          <ArrowRight className="w-4 h-4 text-foreground" />
        </button>
        <div className="flex-1 px-3 py-1.5 bg-secondary rounded-lg mono text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
          {addressBar || "Select a drive"}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-40 border-r border-border p-2 space-y-1 overflow-auto">
          {drives.map((d) => (
            <button
              key={d}
              onClick={() => handleDriveClick(d)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition ${
                currentDrive === d ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
              }`}
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span className="truncate">{d}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-3 overflow-auto">
          {!currentDrive && (
            <p className="text-muted-foreground text-xs">Select a drive to browse</p>
          )}
          {currentDrive && node && (
            <div className="grid grid-cols-4 gap-2">
              {node.folders?.map((folder) => (
                <button
                  key={folder}
                  onDoubleClick={() => navigateTo(currentDrive, [...currentPath, folder])}
                  className="desktop-icon-btn"
                >
                  <Folder className="w-8 h-8 text-primary" />
                  <span className="text-xs text-foreground">{folder}</span>
                </button>
              ))}
              {node.files?.map((file) => (
                <div key={file} className="desktop-icon-btn cursor-default">
                  <File className="w-8 h-8 text-muted-foreground" />
                  <span className="text-xs text-foreground">{file}</span>
                </div>
              ))}
              {!node.folders?.length && !node.files?.length && (
                <p className="text-muted-foreground text-xs col-span-4">Empty directory</p>
              )}
            </div>
          )}
        </div>
      </div>

      {showPassword && (
        <PasswordModal onSuccess={handleUnlock} onCancel={() => { setShowPassword(false); setPendingDrive(null); }} />
      )}
    </div>
  );
}
