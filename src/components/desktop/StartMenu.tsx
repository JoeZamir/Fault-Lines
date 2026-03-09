import { useDesktop } from "@/context/DesktopContext";
import { LogOut, User, Terminal, Shield, FolderOpen, Briefcase, Settings, Info } from "lucide-react";

export default function StartMenu() {
  const { user, logout, setStartMenuOpen, openWindow } = useDesktop();

  const handleLogout = () => {
    logout();
  };

  const handleOpen = (type: string, title: string) => {
    openWindow(type, title);
    setStartMenuOpen(false);
  };

  const recentApps = [
    { icon: Shield, label: "Encryption Tool", type: "EncryptionTool" },
    { icon: FolderOpen, label: "File Explorer", type: "FileExplorer" },
    { icon: Briefcase, label: "Workspace", type: "placeholder" },
    { icon: Settings, label: "Settings", type: "settings" },
    { icon: Info, label: "About", type: "about" },
  ];

  return (
    <div
      className="start-menu-panel fixed bottom-12 left-2 w-72 rounded-xl z-[10000] animate-slide-up flex flex-col overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Recent Apps */}
      <div className="p-3 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-2 mb-2">
          Recent Apps
        </p>
        <div className="space-y-0.5">
          {recentApps.map((app) => (
            <button
              key={app.type}
              onClick={() => handleOpen(app.type, app.label)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition text-sm text-foreground"
            >
              <app.icon className="w-4 h-4 text-muted-foreground" />
              {app.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal shortcut */}
      <div className="px-3 pb-2">
        <button
          onClick={() => handleOpen("terminal", "Terminal")}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition text-sm text-foreground"
        >
          <Terminal className="w-4 h-4 text-primary" />
          Terminal
        </button>
      </div>

      {/* Divider + Account section */}
      <div className="border-t border-border px-3 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{user?.username}</p>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-destructive/20 transition text-destructive"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
