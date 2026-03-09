import { FileSearch, Lock, Monitor } from "lucide-react";

export default function NaomiWorkspace() {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <FileSearch className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">Research Workspace</h2>
      <p className="text-sm text-muted-foreground max-w-xs">
        This workspace is under development. Tools for encryption analysis, research logs, and drive scanning will be available here.
      </p>
      <div className="flex gap-3 mt-4">
        {[
          { icon: Lock, label: "Encryption Files" },
          { icon: FileSearch, label: "Research Logs" },
          { icon: Monitor, label: "Drive Scanner" },
        ].map((tool) => (
          <div key={tool.label} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-secondary/40 border border-border">
            <tool.icon className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{tool.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
