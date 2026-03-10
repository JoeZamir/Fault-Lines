import { useState } from "react";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import PasswordModal from "@/components/apps/FileExplorer/PasswordModal";

const items = ["0x001265f.encrypt", "8df77a9.encrypt", "vault_dir.encrypt", "backup_set.encrypt"];

export default function Drive2Window() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="p-4 h-full relative">
      <h3 className="text-sm font-semibold mb-3">Drive_2 (Encrypted)</h3>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <button
            key={item}
            onDoubleClick={() => (unlocked ? toast.success("file mounted") : toast.error("access denied"))}
            className="desktop-icon-btn"
          >
            <Lock className="w-8 h-8 text-muted-foreground" />
            <span className="text-xs">{item}</span>
          </button>
        ))}
      </div>

      {!unlocked && <PasswordModal onSuccess={() => setUnlocked(true)} onCancel={() => toast.error("Drive_2 remains locked")} />}
    </div>
  );
}
