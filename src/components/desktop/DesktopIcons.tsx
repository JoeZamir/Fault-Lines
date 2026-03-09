import { useDesktop } from "@/context/DesktopContext";
import DesktopIcon from "./DesktopIcon";
import { Monitor, Trash2, Settings, Lock, FolderOpen, FileSearch } from "lucide-react";

const SHARED_ICONS = [
  { id: "mypc", label: "My PC", icon: Monitor, app: "mypc", title: "My PC" },
  { id: "trash", label: "Trash", icon: Trash2, app: "trash", title: "Trash" },
  { id: "settings", label: "Settings", icon: Settings, app: "settings", title: "Settings" },
];

const USER_ICONS: Record<string, { id: string; label: string; icon: typeof Monitor; app: string; title: string }[]> = {
  encryptionTool: [{ id: "encryptionTool", label: "USB Encryption Tool", icon: Lock, app: "EncryptionTool", title: "USB Encryption Tool" }],
  fileExplorer: [{ id: "fileExplorer", label: "File Explorer", icon: FolderOpen, app: "FileExplorer", title: "File Explorer" }],
  naomiWorkspace: [
    { id: "encFiles", label: "Encryption Files", icon: Lock, app: "placeholder", title: "Encryption Files" },
    { id: "researchLogs", label: "Research Logs", icon: FileSearch, app: "placeholder", title: "Research Logs" },
    { id: "driveScanner", label: "Drive Scanner", icon: Monitor, app: "placeholder", title: "Drive Scanner" },
  ],
};

export default function DesktopIcons() {
  const { user, openWindow } = useDesktop();
  if (!user) return null;

  const userIcons = user.desktopIcons.flatMap((key) => USER_ICONS[key] ?? []);
  const allIcons = [...userIcons, ...SHARED_ICONS];

  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2">
      {allIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          label={icon.label}
          icon={icon.icon}
          onDoubleClick={() => openWindow(icon.app, icon.title)}
        />
      ))}
    </div>
  );
}
