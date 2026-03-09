import { useState, useEffect } from "react";
import { useDesktop } from "@/context/DesktopContext";
import StartMenu from "./StartMenu";
import { LayoutGrid } from "lucide-react";

export default function Taskbar() {
  const { windows, focusedWindowId, focusWindow, restoreWindow, minimizeWindow, startMenuOpen, setStartMenuOpen } = useDesktop();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {startMenuOpen && <StartMenu />}
      <div className="taskbar-panel fixed bottom-0 left-0 right-0 h-11 flex items-center px-2 z-[9999]">
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="h-8 px-3 rounded flex items-center gap-2 hover:bg-secondary transition text-sm font-medium text-[hsl(var(--taskbar-foreground))]"
        >
          <LayoutGrid className="w-4 h-4 text-primary" />
          Menu
        </button>

        <div className="h-6 w-px bg-border mx-2" />

        <div className="flex items-center gap-1 flex-1 overflow-x-auto">
          {windows.map((win) => (
            <button
              key={win.id}
              onClick={() => {
                if (focusedWindowId === win.id && !win.minimized) {
                  minimizeWindow(win.id);
                } else {
                  restoreWindow(win.id);
                  focusWindow(win.id);
                }
              }}
              className={`h-8 px-3 rounded text-xs truncate max-w-[160px] transition ${
                focusedWindowId === win.id && !win.minimized
                  ? "bg-primary/20 text-primary"
                  : "text-[hsl(var(--taskbar-foreground))] hover:bg-secondary"
              }`}
            >
              {win.title}
            </button>
          ))}
        </div>

        <div className="text-xs text-[hsl(var(--taskbar-foreground))] mono px-3">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </>
  );
}
