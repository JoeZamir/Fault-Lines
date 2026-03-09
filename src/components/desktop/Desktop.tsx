import { useDesktop } from "@/context/DesktopContext";
import DesktopIcons from "./DesktopIcons";
import Taskbar from "./Taskbar";
import WindowManager from "@/components/window/WindowManager";

export default function Desktop() {
  const { setStartMenuOpen } = useDesktop();

  return (
    <div
      className="fixed inset-0 desktop-wallpaper overflow-hidden"
      onClick={() => setStartMenuOpen(false)}
    >
      <DesktopIcons />
      <WindowManager />
      <Taskbar />
    </div>
  );
}
