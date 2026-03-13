import { useEffect, useMemo, useRef, useState } from "react";
import { FILE_SYSTEM, ENCRYPTED_DRIVES, FSNode } from "@/utils/fileSystem";
import PasswordModal from "./PasswordModal";
import { Folder, File, HardDrive, ArrowLeft, ArrowRight, Home, Download, FileText, Image, Music, Video, Plus, Monitor } from "lucide-react";
import { useDesktop } from "@/context/DesktopContext";
import { GALLERY_IMAGES } from "@/utils/galleryData";

interface HistoryEntry { path: string[]; driveKey: string }
type ExplorerView = "home" | "myPc" | "drive" | "special";
type QuickAccessLabel = "Home" | "My PC" | "Downloads" | "Documents" | "Pictures" | "Music" | "Videos";

const quickAccess: { icon: typeof Home; label: QuickAccessLabel }[] = [
  { icon: Home, label: "Home" },
  { icon: Monitor, label: "My PC" },
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

const specialCollections: Record<Exclude<QuickAccessLabel, "Home" | "My PC">, { folders: string[]; files: string[] }> = {
  Downloads: {
    folders: ["Installers", "Compressed"],
    files: ["release-notes.txt", "penguin-shell-update.deb", "screenshots.zip"],
  },
  Documents: {
    folders: ["Work", "Receipts", "Projects"],
    files: ["QuarterlyReport.pdf", "MeetingMinutes.docx", "README.md"],
  },
  Pictures: {
    folders: ["Wallpapers", "Camera"],
    files: GALLERY_IMAGES.map((image) => image.name),
  },
  Music: {
    folders: ["Albums", "Podcasts"],
    files: ["ambient-loop.mp3", "conference-keynote.ogg", "night-drive.flac"],
  },
  Videos: {
    folders: ["Recordings", "Captures"],
    files: ["intro.mp4", "walkthrough.mov", "presentation.mkv"],
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
  const [activeView, setActiveView] = useState<ExplorerView>(startInMyPc ? "myPc" : "home");
  const [activeQuickAccess, setActiveQuickAccess] = useState<QuickAccessLabel>(startInMyPc ? "My PC" : "Home");
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
    setActiveView("drive");
    const entry = { path, driveKey };
    const newHistory = [...history.slice(0, historyIndex + 1), entry];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleDriveClick = (driveKey: string) => {
    if (driveKey === "B: USB_key") {
      setCurrentDrive("B: USB_key");
      setCurrentPath([]);
      setActiveView("drive");
      setActiveQuickAccess("My PC");
      return;
    }
    if (ENCRYPTED_DRIVES.includes(driveKey) && !unlockedDrives.has(driveKey)) {
      setPendingDrive(driveKey);
      setShowPassword(true);
      return;
    }
    setActiveQuickAccess("My PC");
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

  const handleQuickAccessClick = (label: QuickAccessLabel) => {
    setActiveQuickAccess(label);
    setCurrentPath([]);

    if (label === "Home") {
      setCurrentDrive(null);
      setActiveView("home");
      return;
    }

    if (label === "My PC") {
      setCurrentDrive(null);
      setActiveView("myPc");
      return;
    }

    setCurrentDrive(null);
    setActiveView("special");
  };

  const openFile = (file: string) => {
    if (file === "_evidence.mp4") {
      openWindow("videoEvidence", "_evidence.mp4");
      return;
    }

    const selectedImage = GALLERY_IMAGES.find((image) => image.name === file);
    if (selectedImage) {
      openWindow("photos", selectedImage.name);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentDrive(prev.driveKey);
      setCurrentPath(prev.path);
      setActiveView("drive");
      setActiveQuickAccess("My PC");
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentDrive(next.driveKey);
      setCurrentPath(next.path);
      setActiveView("drive");
      setActiveQuickAccess("My PC");
    }
  };

  const node = getCurrentNode();
  const specialItems = activeQuickAccess in specialCollections ? specialCollections[activeQuickAccess as Exclude<QuickAccessLabel, "Home" | "My PC">] : null;

  const addressBar =
    activeView === "home"
      ? "Home"
      : activeView === "myPc"
        ? "My PC"
        : activeView === "special"
          ? activeQuickAccess
          : currentDrive
            ? `${currentDrive}:/${currentPath.join("/")}`
            : "Home";

  return (
    <div className="relative flex h-full flex-col text-sm">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/30 px-3 py-2">
        <button onClick={goBack} disabled={historyIndex <= 0} className="rounded p-1 hover:bg-secondary disabled:opacity-30"><ArrowLeft className="h-4 w-4" /></button>
        <button onClick={goForward} disabled={historyIndex >= history.length - 1} className="rounded p-1 hover:bg-secondary disabled:opacity-30"><ArrowRight className="h-4 w-4" /></button>
        <div className="mono flex-1 truncate rounded-lg bg-secondary px-3 py-1.5 text-xs">{addressBar}</div>
        <button className="flex items-center gap-1 rounded border border-border px-2 py-1 text-xs"><Plus className="h-3 w-3" /> New</button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-52 space-y-3 overflow-auto border-r border-border p-2">
          <div>
            <p className="text-[10px] uppercase text-muted-foreground">Quick access</p>
            {quickAccess.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleQuickAccessClick(item.label)}
                className={`mt-0.5 flex w-full items-center gap-2 rounded px-2 py-1 text-xs ${activeQuickAccess === item.label ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            ))}
          </div>
          <div>
            <p className="text-[10px] uppercase text-muted-foreground">Drives</p>
            {drives.map((drive) => (
              <button key={drive} onClick={() => handleDriveClick(drive)} className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs ${currentDrive === drive ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}>
                <HardDrive className="h-3.5 w-3.5" />{drive}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-3">
          {activeView === "home" && (
            <>
              <h4 className="mb-2 text-xs font-semibold">Home</h4>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {quickAccess.slice(2).map((item) => (
                  <button key={item.label} type="button" className="desktop-icon-btn" onDoubleClick={() => handleQuickAccessClick(item.label)}>
                    <item.icon className="h-8 w-8 text-primary" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
              <h4 className="mb-2 text-xs font-semibold">Recent</h4>
              <div className="text-xs text-muted-foreground">QuarterlyReport.pdf, screenshots.zip, aurora-notes.txt</div>
            </>
          )}

          {activeView === "myPc" && (
            <>
              <h4 className="mb-3 text-xs font-semibold">My PC</h4>
              <div className="grid grid-cols-3 gap-3">
                {drives.map((drive) => (
                  <button key={drive} type="button" onDoubleClick={() => handleDriveClick(drive)} className="desktop-icon-btn">
                    <HardDrive className="h-8 w-8 text-primary" />
                    <span className="text-xs">{drive}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {activeView === "special" && specialItems && (
            <div className="grid grid-cols-4 gap-2">
              {specialItems.folders.map((folder) => (
                <button key={folder} className="desktop-icon-btn">
                  <Folder className="h-8 w-8 text-primary" /><span className="text-xs">{folder}</span>
                </button>
              ))}
              {specialItems.files.map((file) => {
                const galleryImage = GALLERY_IMAGES.find((image) => image.name === file);
                return (
                  <button key={file} onDoubleClick={() => openFile(file)} className="desktop-icon-btn">
                    {galleryImage ? (
                      <img src={galleryImage.thumb} alt={file} className="h-8 w-8 rounded object-cover ring-1 ring-white/20" />
                    ) : (
                      <File className="h-8 w-8 text-muted-foreground" />
                    )}
                    <span className="text-xs">{file}</span>
                  </button>
                );
              })}
            </div>
          )}

          {activeView === "drive" && currentDrive === "B: USB_key" && <p className="text-xs text-muted-foreground">vault_key mounted. Use terminal tools for decryption.</p>}
          {activeView === "drive" && currentDrive && node && (
            <div className="grid grid-cols-4 gap-2">
              {node.folders?.map((folder) => (
                <button key={folder} onDoubleClick={() => navigateTo(currentDrive, [...currentPath, folder])} className="desktop-icon-btn">
                  <Folder className="h-8 w-8 text-primary" /><span className="text-xs">{folder}</span>
                </button>
              ))}
              {node.files?.map((file) => (
                <button key={file} onDoubleClick={() => openFile(file)} className="desktop-icon-btn">
                  <File className="h-8 w-8 text-muted-foreground" /><span className="text-xs">{file}</span>
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
