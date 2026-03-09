import { useDesktop } from "@/context/DesktopContext";
import WindowFrame from "./WindowFrame";
import EncryptionToolWindow from "@/components/apps/EncryptionTool/EncryptionToolWindow";
import FileExplorerWindow from "@/components/apps/FileExplorer/FileExplorerWindow";
import NaomiWorkspace from "@/components/apps/NaomiWorkspace/NaomiWorkspace";
import { Info, Settings as SettingsIcon, Monitor, Trash2 } from "lucide-react";

function PlaceholderApp({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
      {title} — Coming soon
    </div>
  );
}

function AboutApp() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
      <Info className="w-10 h-10 text-primary" />
      <h2 className="text-lg font-semibold text-foreground">FaultLines</h2>
      <p className="text-sm text-muted-foreground max-w-sm">
        A simulated desktop environment for encryption workflows and file exploration. Built with React and TailwindCSS.
      </p>
      <p className="text-xs text-muted-foreground mono">v1.0.0</p>
    </div>
  );
}

function SettingsApp() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
      <SettingsIcon className="w-10 h-10 text-muted-foreground" />
      <h2 className="text-lg font-semibold text-foreground">Settings</h2>
      <p className="text-sm text-muted-foreground">System settings are not yet available.</p>
    </div>
  );
}

function MyPCApp() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
      <Monitor className="w-10 h-10 text-muted-foreground" />
      <h2 className="text-lg font-semibold text-foreground">My PC</h2>
      <p className="text-sm text-muted-foreground">System information display — coming soon.</p>
    </div>
  );
}

function TrashApp() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
      <Trash2 className="w-10 h-10 text-muted-foreground" />
      <h2 className="text-lg font-semibold text-foreground">Trash</h2>
      <p className="text-sm text-muted-foreground">Trash is empty.</p>
    </div>
  );
}

function getAppContent(type: string, title: string) {
  switch (type) {
    case "EncryptionTool": return <EncryptionToolWindow />;
    case "FileExplorer": return <FileExplorerWindow />;
    case "placeholder": return <NaomiWorkspace />;
    case "about": return <AboutApp />;
    case "settings": return <SettingsApp />;
    case "mypc": return <MyPCApp />;
    case "trash": return <TrashApp />;
    default: return <PlaceholderApp title={title} />;
  }
}

export default function WindowManager() {
  const { windows, focusedWindowId } = useDesktop();

  return (
    <>
      {windows.map((win, idx) => (
        <WindowFrame
          key={win.id}
          window={win}
          zIndex={100 + (focusedWindowId === win.id ? 999 : idx)}
          isFocused={focusedWindowId === win.id}
        >
          {getAppContent(win.type, win.title)}
        </WindowFrame>
      ))}
    </>
  );
}
