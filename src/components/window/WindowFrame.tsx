import { useRef, useState, useCallback } from "react";
import { useDesktop, DesktopWindow } from "@/context/DesktopContext";
import { X, Minus } from "lucide-react";

interface WindowFrameProps {
  window: DesktopWindow;
  zIndex: number;
  isFocused: boolean;
  children: React.ReactNode;
}

export default function WindowFrame({ window: win, zIndex, isFocused, children }: WindowFrameProps) {
  const { closeWindow, minimizeWindow, focusWindow, moveWindow } = useDesktop();
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    focusWindow(win.id);
    setDragging(true);
    dragOffset.current = { x: e.clientX - win.position.x, y: e.clientY - win.position.y };

    const onMove = (ev: MouseEvent) => {
      moveWindow(win.id, {
        x: Math.max(0, ev.clientX - dragOffset.current.x),
        y: Math.max(0, ev.clientY - dragOffset.current.y),
      });
    };
    const onUp = () => {
      setDragging(false);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [focusWindow, moveWindow, win.id, win.position]);

  if (win.minimized) return null;

  return (
    <div
      className={`window-frame absolute animate-window-open ${isFocused ? 'ring-1 ring-primary/30' : ''}`}
      style={{
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
        zIndex,
      }}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title bar */}
      <div
        className={`flex items-center justify-between px-3 py-2 cursor-move select-none ${
          isFocused ? 'bg-[hsl(var(--window-titlebar-active))]' : 'bg-[hsl(var(--window-titlebar))]'
        }`}
        onMouseDown={onMouseDown}
      >
        <span className="text-sm font-medium text-foreground truncate">{win.title}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-secondary transition"
          >
            <Minus className="w-3 h-3 text-muted-foreground" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-destructive/80 transition"
          >
            <X className="w-3 h-3 text-muted-foreground" />
          </button>
        </div>
      </div>
      {/* Body */}
      <div className="bg-[hsl(var(--window-body))] overflow-auto" style={{ height: `calc(100% - 36px)` }}>
        {children}
      </div>
    </div>
  );
}
