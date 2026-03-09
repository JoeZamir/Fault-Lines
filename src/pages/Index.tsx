import { DesktopProvider, useDesktop } from "@/context/DesktopContext";
import LoginScreen from "@/components/desktop/LoginScreen";
import Desktop from "@/components/desktop/Desktop";

function DesktopApp() {
  const { user } = useDesktop();
  return user ? <Desktop /> : <LoginScreen />;
}

export default function Index() {
  return (
    <DesktopProvider>
      <DesktopApp />
    </DesktopProvider>
  );
}
