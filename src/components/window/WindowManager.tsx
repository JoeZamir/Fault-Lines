import { ReactNode, useMemo, useState } from "react";
import { useDesktop } from "@/context/DesktopContext";
import WindowFrame from "./WindowFrame";
import EncryptionToolWindow from "@/components/apps/EncryptionTool/EncryptionToolWindow";
import FileExplorerWindow from "@/components/apps/FileExplorer/FileExplorerWindow";
import {
  Bell,
  Bluetooth,
  Brush,
  Globe,
  HardDrive,
  Info,
  Languages,
  Lock,
  Network,
  Shield,
  Trash2,
  User,
  Volume2,
  Wifi,
} from "lucide-react";
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
  const settingSections = useMemo(
    () => [
      {
        id: "system",
        title: "System",
        icon: Info,
        description: "Device details, storage, and system information.",
      },
      {
        id: "appearance",
        title: "Appearance",
        icon: Brush,
        description: "Theme, wallpaper, and dock preferences.",
      },
      {
        id: "network",
        title: "Network",
        icon: Network,
        description: "Wi‑Fi, Bluetooth, and VPN management.",
      },
      {
        id: "sound",
        title: "Sound",
        icon: Volume2,
        description: "Output, input, and alert volume controls.",
      },
      {
        id: "notifications",
        title: "Notifications",
        icon: Bell,
        description: "Notification style and app-level controls.",
      },
      {
        id: "privacy",
        title: "Privacy & Security",
        icon: Shield,
        description: "Lock screen and security permissions.",
      },
      {
        id: "users",
        title: "Users",
        icon: User,
        description: "Account details and login settings.",
      },
      {
        id: "language",
        title: "Region & Language",
        icon: Languages,
        description: "Display language, formats, and timezone.",
      },
    ],
    []
  );

  const [activeSection, setActiveSection] = useState(settingSections[0].id);
  const active = settingSections.find((section) => section.id === activeSection) ?? settingSections[0];

  return (
    <div className="grid h-full grid-cols-[240px_1fr] bg-background text-foreground">
      <aside className="border-r bg-muted/20 p-3">
        <div className="mb-4 rounded-lg border bg-card px-3 py-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Penguin OS</p>
          <p className="text-sm font-semibold">System Settings</p>
        </div>
        <nav className="space-y-1">
          {settingSections.map((section) => {
            const Icon = section.icon;
            const selected = section.id === activeSection;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`flex w-full items-start gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{section.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="overflow-auto p-6">
        <header className="mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold">{active.title}</h2>
          <p className="text-sm text-muted-foreground">{active.description}</p>
        </header>

        {activeSection === "system" && (
          <div className="space-y-4 text-sm">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-3 font-medium">About Penguin OS</h3>
              <dl className="grid grid-cols-2 gap-2 text-muted-foreground">
                <dt>OS Name</dt><dd className="text-foreground">Penguin OS 24.04 LTS</dd>
                <dt>Desktop Environment</dt><dd className="text-foreground">Penguin Shell 1.8</dd>
                <dt>Kernel</dt><dd className="text-foreground">Linux 6.8.12-penguin</dd>
                <dt>Processor</dt><dd className="text-foreground">8-Core Penguin x86_64</dd>
              </dl>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-3 flex items-center gap-2 font-medium"><HardDrive className="h-4 w-4" /> Storage</h3>
              <p className="mb-2 text-muted-foreground">256 GB total • 118 GB used • 138 GB available</p>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-[46%] rounded-full bg-primary" />
              </div>
            </div>
          </div>
        )}

        {activeSection === "appearance" && (
          <div className="space-y-4 text-sm">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-3 font-medium">Theme</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["Light", "bg-white"],
                  ["Dark", "bg-zinc-900"],
                  ["Auto", "bg-gradient-to-r from-white to-zinc-900"],
                ].map(([name, style]) => (
                  <button key={name} className="rounded-md border p-2 text-left hover:border-primary">
                    <div className={`mb-2 h-10 rounded ${style}`} />
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 font-medium">Desktop options</h3>
              <p className="text-muted-foreground">Show dock, icons, and dynamic wallpaper rotation.</p>
            </div>
          </div>
        )}

        {activeSection === "network" && (
          <div className="space-y-4 text-sm">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 flex items-center gap-2 font-medium"><Wifi className="h-4 w-4" /> Wi‑Fi</h3>
              <p className="text-muted-foreground">Connected to PenguinNet-5G</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 flex items-center gap-2 font-medium"><Bluetooth className="h-4 w-4" /> Bluetooth</h3>
              <p className="text-muted-foreground">On • 2 devices paired</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 flex items-center gap-2 font-medium"><Globe className="h-4 w-4" /> VPN</h3>
              <p className="text-muted-foreground">No active VPN profile</p>
            </div>
          </div>
        )}

        {activeSection === "sound" && <SettingsList items={["Output: Internal Speakers", "Input: Built-in Microphone", "Alert volume: 75%"]} />}
        {activeSection === "notifications" && <SettingsList items={["Do Not Disturb schedule", "Lock screen notifications", "Application notification permissions"]} />}
        {activeSection === "privacy" && (
          <SettingsList
            items={[
              "Screen lock after 5 minutes",
              "Firewall enabled",
              "Disk encryption active",
              "Location services: Ask per app",
            ]}
            icon={<Lock className="h-4 w-4" />}
          />
        )}
        {activeSection === "users" && <SettingsList items={["Primary user: penguin", "Automatic login: Off", "Fingerprint login: Enabled"]} />}
        {activeSection === "language" && <SettingsList items={["Display language: English (US)", "Region: Antarctica Standard", "Timezone: UTC+00:00"]} />}
      </section>
    </div>
  );
}

function SettingsList({ items, icon }: { items: string[]; icon?: ReactNode }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-sm">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 rounded border bg-background p-2 text-muted-foreground">
            {icon}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrashApp() {
  return <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center"><Trash2 className="w-10 h-10 text-muted-foreground" /><h2 className="text-lg font-semibold text-foreground">Trash</h2><p className="text-sm text-muted-foreground">Trash is empty.</p></div>;
}

function getAppContent(type: string, title: string) {
  switch (type) {
    case "EncryptionTool": return <EncryptionToolWindow />;
    case "FileExplorer": return <FileExplorerWindow />;
    case "mypc": return <FileExplorerWindow startInMyPc />;
    case "terminal": return <TerminalWindow title={title} />;
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
