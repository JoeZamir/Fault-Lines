import { useState, useEffect } from "react";
import { useDesktop } from "@/context/DesktopContext";
import { validateLogin } from "@/utils/auth";
import { Monitor, Maximize, Eye, EyeOff } from "lucide-react";

export default function LoginScreen() {
  const { setUser } = useDesktop();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    const user = validateLogin(username, password);
    if (user) {
      setUser(user);
    } else {
      setError("Invalid credentials");
    }
  };

  const handleFullscreen = () => {
    document.documentElement.requestFullscreen?.();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[hsl(var(--login-bg))]">
      <div className="absolute inset-0 desktop-wallpaper opacity-20" />
      <div className="relative login-card rounded-2xl p-8 w-[380px] animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4">
            <img
              src="/logos/PenguinOSlogo-192.png"
              srcSet="
                /logos/PenguinOSlogo-96.png 96w,
                /logos/PenguinOSlogo-192.png 192w,
                /logos/PenguinOSlogo.png 512w
              "
              alt="PenguinOS logo"
              sizes="192px"
              className="w-full h-auto object-cover"
            />
            <p className="text-xl font-bold">Penguin<span className="text-2xl text-primary">OS</span></p>
          </div>
          <h1 className="text-xl font-semibold text-foreground">Sign in</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="w-full px-4 py-3 pr-10 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-destructive text-sm animate-slide-up">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:brightness-110 transition"
          >
            Log In
          </button>
        </form>

        <button
          onClick={handleFullscreen}
          className={`mt-4 w-full py-2 rounded-lg border border-border text-muted-foreground text-sm flex items-center justify-center gap-2 hover:bg-secondary transition-opacity duration-300 ${isFullscreen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <Maximize className="w-4 h-4" />
          Enter Fullscreen
        </button>
      </div>
    </div>
  );
}
