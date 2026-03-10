import { useDesktop } from "@/context/DesktopContext";
import WindowFrame from "./WindowFrame";
import EncryptionToolWindow from "@/components/apps/EncryptionTool/EncryptionToolWindow";
import FileExplorerWindow from "@/components/apps/FileExplorer/FileExplorerWindow";
import { Info, Settings as SettingsIcon, Trash2 } from "lucide-react";
import TerminalWindow from "@/components/apps/Terminal/TerminalWindow";
import USBAnalyzerWindow from "@/components/apps/NaomiTools/USBAnalyzerWindow";
import Drive2Window from "@/components/apps/Drive2/Drive2Window";
import DecryptedEvidenceWindow from "@/components/apps/NaomiTools/DecryptedEvidenceWindow";
import ExtortionVideoWindow from "@/components/apps/Video/ExtortionVideoWindow";

function PlaceholderApp({ title }: { title: string }) {
  return <div className="flex items-center justify-center h-full text-muted-foreground text-sm">{title} — Coming soon</div>;
}

function AboutApp() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
      <Info className="w-10 h-10 text-primary" />
      <h2 className="text-lg font-semibold text-foreground">FaultLines</h2>
      <p className="text-sm text-muted-foreground max-w-sm">A simulated desktop environment for encryption workflows and file exploration. Built with React and TailwindCSS.</p>
      <p className="text-xs text-muted-foreground mono">v1.0.0</p>
    </div>
  );
}

function SettingsApp() {
  return <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center"><SettingsIcon className="w-10 h-10 text-muted-foreground" /><h2 className="text-lg font-semibold text-foreground">Settings</h2></div>;
}

function TrashApp() {
  return <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center"><Trash2 className="w-10 h-10 text-muted-foreground" /><h2 className="text-lg font-semibold text-foreground">Trash</h2><p className="text-sm text-muted-foreground">Trash is empty.</p></div>;
}

function getAppContent(type: string, title: string) {
  switch (type) {
    case "EncryptionTool": return <EncryptionToolWindow />;
    case "FileExplorer": return <FileExplorerWindow />;
    case "mypc": return <FileExplorerWindow startInMyPc />;
    case "terminal": return <TerminalWindow />;
    case "usbAnalyzer": return <USBAnalyzerWindow />;
    case "drive2": return <Drive2Window />;
    case "decryptedEvidence": return <DecryptedEvidenceWindow title={title} />;
    case "videoEvidence": return <ExtortionVideoWindow />;
    case "about": return <AboutApp />;
    case "settings": return <SettingsApp />;
    case "trash": return <TrashApp />;
    default: return <PlaceholderApp title={title} />;
  }
}

export default function WindowManager() {
  const { windows, focusedWindowId } = useDesktop();

  return (
    <>
      {windows.map((win, idx) => (
        <WindowFrame key={win.id} window={win} zIndex={100 + (focusedWindowId === win.id ? 999 : idx)} isFocused={focusedWindowId === win.id}>
          {getAppContent(win.type, win.title)}
        </WindowFrame>
      ))}
    </>
  );
}
