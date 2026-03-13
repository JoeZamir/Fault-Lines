import { useDesktop } from "@/context/DesktopContext";
import DesktopIcon from "./DesktopIcon";
import { Monitor, Trash2, Settings, Shield, FolderOpen, Terminal, HardDrive, Usb, Search, KeyRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

const SHARED_ICONS = [
  { id: "fileExplorer", label: "File Explorer", icon: FolderOpen, app: "FileExplorer", title: "File Explorer" },
  { id: "mypc", label: "My PC", icon: Monitor, app: "mypc", title: "My PC" },
  { id: "terminal", label: "Terminal", icon: Terminal, app: "terminal", title: "Terminal" },
  { id: "trash", label: "Trash", icon: Trash2, app: "trash", title: "Trash" },
  { id: "settings", label: "Settings", icon: Settings, app: "settings", title: "Settings" },
];

function USBAnalyzerIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <Usb className="w-full h-full" />
      <Search className="w-1/2 h-1/2 absolute -right-1 -bottom-1 bg-[#31114f] rounded-full p-0.5" />
    </div>
  );
}

function PiDecryptIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <Terminal className="w-full h-full" />
      <KeyRound className="w-1/2 h-1/2 absolute -right-1 -bottom-1 bg-[#1b1c42] rounded-full p-0.5" />
    </div>
  );
}

type DesktopIconComponent = LucideIcon | ComponentType<{ className?: string }>;

const USER_ICONS: Record<string, { id: string; label: string; icon: DesktopIconComponent; app: string; title: string; iconClassName?: string; containerClassName?: string }[]> = {
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
    {
      id: "usbAnalyzer",
      label: "USB analyzer",
      icon: USBAnalyzerIcon,
      app: "usbAnalyzer",
      title: "USB analyzer",
      iconClassName: "text-[#ffb703]",
      containerClassName: "bg-gradient-to-br from-[#35134d]/90 to-[#4b1f6f]/90 border border-[#ffb703]/40",
    },
    {
      id: "piDecrypt",
      label: "pi_decrypt",
      icon: PiDecryptIcon,
      app: "terminal",
      title: "pi_decrypt terminal",
      iconClassName: "text-[#6fe7dd]",
      containerClassName: "bg-gradient-to-br from-[#14213d]/90 to-[#1b1c42]/90 border border-[#6fe7dd]/40",
    },
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
