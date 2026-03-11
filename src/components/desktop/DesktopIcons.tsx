import { useDesktop } from "@/context/DesktopContext";
import DesktopIcon from "./DesktopIcon";
import { Monitor, Trash2, Settings, Shield, FolderOpen, Terminal, ScanSearch, HardDrive } from "lucide-react";

const SHARED_ICONS = [
  { id: "fileExplorer", label: "File Explorer", icon: FolderOpen, app: "FileExplorer", title: "File Explorer" },
  { id: "mypc", label: "My PC", icon: Monitor, app: "mypc", title: "My PC" },
  { id: "terminal", label: "Terminal", icon: Terminal, app: "terminal", title: "Terminal" },
  { id: "trash", label: "Trash", icon: Trash2, app: "trash", title: "Trash" },
  { id: "settings", label: "Settings", icon: Settings, app: "settings", title: "Settings" },
];

const USER_ICONS: Record<string, { id: string; label: string; icon: typeof Monitor; app: string; title: string; iconClassName?: string; containerClassName?: string }[]> = {
  encryptionTool: [{
    id: "encryptionTool",
    label: "N-Crypt",
    icon: Shield,
    app: "EncryptionTool",
    title: "N-Crypt",
    iconClassName: "text-cyan-100",
    containerClassName: "bg-gradient-to-br from-cyan-600/80 to-indigo-700/90 border border-cyan-200/50",
  }],
  fileExplorer: [{ id: "drive2", label: "Drive_2", icon: HardDrive, app: "drive2", title: "Drive_2" }],
  naomiWorkspace: [
    { id: "usbAnalyzer", label: "USB analyzer", icon: ScanSearch, app: "usbAnalyzer", title: "USB analyzer" },
    { id: "piDecrypt", label: "pi_decrypt", icon: Terminal, app: "terminal", title: "pi_decrypt terminal" },
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
          iconClassName={icon.iconClassName}
          containerClassName={icon.containerClassName}
          onDoubleClick={() => openWindow(icon.app, icon.title)}
        />
      ))}
    </div>
  );
}
