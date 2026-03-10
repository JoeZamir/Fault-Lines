import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { DRIVE_PASSWORD } from "@/utils/fileSystem";

interface PasswordModalProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PasswordModal({ onSuccess, onCancel }: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(5);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (password === DRIVE_PASSWORD) {
      onSuccess();
    } else {
      const remaining = attempts - 1;
      setAttempts(remaining);
      setError(`wrong password! ${remaining} attempts left`);
      setPassword("");
      if (remaining <= 0) onCancel();
    }
  };

  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card rounded-xl p-6 w-72 border border-border shadow-xl animate-window-open">
        <h3 className="text-sm font-semibold text-foreground mb-1">Drive is encrypted</h3>
        <p className="text-xs text-muted-foreground mb-3">Enter password to access this drive</p>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            className="w-full px-3 py-2 pr-9 rounded-lg bg-secondary text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            placeholder="Password"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground transition">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {error && <p className="text-destructive text-xs mt-2 font-medium">{error}</p>}
        <div className="flex gap-2 mt-4">
          <button onClick={onCancel} className="flex-1 py-2 rounded-lg border border-border text-foreground text-sm hover:bg-secondary transition">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Unlock</button>
        </div>
      </div>
    </div>
  );
}
