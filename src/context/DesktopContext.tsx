import React, { createContext, useContext, useState, useCallback } from "react";
import { UserConfig } from "@/config/users";

export interface DesktopWindow {
  id: string;
  type: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minimized: boolean;
}

interface DesktopContextType {
  user: UserConfig | null;
  setUser: (u: UserConfig | null) => void;
  windows: DesktopWindow[];
  focusedWindowId: string | null;
  openWindow: (type: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, pos: { x: number; y: number }) => void;
  startMenuOpen: boolean;
  setStartMenuOpen: (v: boolean) => void;
}

const DesktopContext = createContext<DesktopContextType | null>(null);

let windowCounter = 0;

export function DesktopProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserConfig | null>(null);
  const [windows, setWindows] = useState<DesktopWindow[]>([]);
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const openWindow = useCallback((type: string, title: string) => {
    const id = `win-${++windowCounter}`;
    const offset = (windowCounter % 5) * 30;
    const newWin: DesktopWindow = {
      id,
      type,
      title,
      position: { x: 100 + offset, y: 60 + offset },
      size: { width: 700, height: 500 },
      minimized: false,
    };
    setWindows((prev) => [...prev, newWin]);
    setFocusedWindowId(id);
    setStartMenuOpen(false);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedWindowId((prev) => (prev === id ? null : prev));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    setFocusedWindowId((prev) => (prev === id ? null : prev));
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
    setFocusedWindowId(id);
  }, []);

  const focusWindow = useCallback((id: string) => {
    setFocusedWindowId(id);
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
  }, []);

  const moveWindow = useCallback((id: string, pos: { x: number; y: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position: pos } : w)));
  }, []);

  return (
    <DesktopContext.Provider
      value={{
        user, setUser,
        windows, focusedWindowId,
        openWindow, closeWindow, minimizeWindow, restoreWindow, focusWindow, moveWindow,
        startMenuOpen, setStartMenuOpen,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error("useDesktop must be used within DesktopProvider");
  return ctx;
}
