import { useDesktop } from "@/context/DesktopContext";
import DesktopIcons from "./DesktopIcons";
import Taskbar from "./Taskbar";
import WindowManager from "@/components/window/WindowManager";

export default function Desktop() {
  const { user, setStartMenuOpen } = useDesktop();

  return (
    <div
      className="fixed inset-0 desktop-wallpaper overflow-hidden"
      style={user ? { backgroundImage: `url('${user.wallpaper}')` } : undefined}
      onClick={() => setStartMenuOpen(false)}
    >
      <DesktopIcons />
      <WindowManager />
      <Taskbar />
    </div>
  );
}
