import { toast } from "sonner";
import { Lock } from "lucide-react";

const items = ["0x001265f.encrypt", "8df77a9.encrypt", "vault_dir.encrypt", "backup_set.encrypt"];

export default function Drive2Window() {
  return (
    <div className="p-4 h-full">
      <h3 className="text-sm font-semibold mb-3">Drive_2 (Encrypted)</h3>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <button
            key={item}
            onDoubleClick={() => toast.error("access denied")}
            className="desktop-icon-btn"
          >
            <Lock className="w-8 h-8 text-muted-foreground" />
            <span className="text-xs">{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
