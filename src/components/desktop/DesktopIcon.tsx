import { LucideIcon } from "lucide-react";

interface DesktopIconProps {
  label: string;
  icon: LucideIcon;
  onDoubleClick: () => void;
  iconClassName?: string;
  containerClassName?: string;
}

export default function DesktopIcon({ label, icon: Icon, onDoubleClick, iconClassName, containerClassName }: DesktopIconProps) {
  return (
    <button className="desktop-icon-btn w-20" onDoubleClick={onDoubleClick}>
      <div className={`w-12 h-12 rounded-lg bg-secondary/60 flex items-center justify-center ${containerClassName ?? ""}`}>
        <Icon className={`w-6 h-6 text-primary ${iconClassName ?? ""}`} />
      </div>
      <span className="text-[11px] text-center leading-tight text-[hsl(var(--desktop-icon-text))] drop-shadow-md">
        {label}
      </span>
    </button>
  );
}
