import { useMemo, useState } from "react";
import { useDesktop } from "@/context/DesktopContext";

type Line = { type: "input" | "output" | "error"; text: string };

const DEK = "7f9a2c1e88b4d0f3c1aa9e77d4e2f9c0";

const HELP_TEXT = [
  "help",
  "clear",
  "lsblk",
  "blkinfo /dev/sda1",
  "blkinfo /dev/sda2",
  "pi_decrypt open --keystore /dev/sda2",
  `pi_decrypt unlock --device /dev/sda1 --dek ${DEK}`,
].join("\n");

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function TerminalWindow() {
  const { user, openWindow } = useDesktop();
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([{ type: "output", text: "Penguin OS Terminal. Type 'help' for commands." }]);
  const [busy, setBusy] = useState(false);
  const [awaitingPassword, setAwaitingPassword] = useState(false);

  const isNaomi = useMemo(() => user?.username === "Naomi", [user?.username]);

  const append = (type: Line["type"], text: string) => setLines((prev) => [...prev, { type, text }]);

  const runCommand = async (raw: string) => {
    const command = raw.trim();
    append("input", `$ ${command}`);
    if (!command) return;

    if (command === "clear") {
      setLines([]);
      return;
    }

    if (command === "help") {
      append("output", HELP_TEXT);
      return;
    }

    if (awaitingPassword) {
      if (command !== "John 8:32") {
        append("error", "validation error");
        return;
      }
      setAwaitingPassword(false);
      append("output", "[ pi_decrypt ] password accepted...");
      await sleep(600);
      append("output", "[ pi_decrypt ] unwrapping DEK...");
      await sleep(600);
      append("output", `DEK: ${DEK}`);
      return;
    }

    if (!isNaomi) {
      append("error", "This terminal profile supports basic help/clear only for this user.");
      return;
    }

    if (command === "lsblk") {
      append("output", "sda > sda1 64GB\nsda > sda2 16GB");
      return;
    }

    if (command === "blkinfo /dev/sda1") {
      append("output", 'label="A" type="vault_archive"');
      return;
    }

    if (command === "blkinfo /dev/sda2") {
      append("output", 'label="B" type="vault_key"');
      return;
    }

    if (command === "pi_decrypt open --keystore /dev/sda2") {
      setBusy(true);
      append("output", "[ pi_decrypt ] Loading keystore metadata...");
      await sleep(700);
      append("output", "[ pi_decrypt ] Parsing header...");
      await sleep(700);
      append("output", "[ pi_decrypt ] Decrypting keystore...");
      await sleep(700);
      append("output", "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒");
      await sleep(500);
      append("output", "[ pi_decrypt ] enter keystore password");
      setAwaitingPassword(true);
      setBusy(false);
      return;
    }


    if (command === `pi_decrypt unlock --device /dev/sda1 --dek ${DEK}`) {
      setBusy(true);
      const logs = [
        "[ pi_decrypt ] Validating DEK...",
        "[ pi_decrypt ] Drive A authenticated.",
        "[ pi_decrypt ] Mounting decrypted volume...",
        "[ pi_decrypt ] /mnt/vault/Faultline_decrypted/",
        "[ pi_decrypt ] open: Faultline_decrypted/",
      ];
      for (const log of logs) {
        append("output", log);
        await sleep(1000);
      }
      openWindow("decryptedEvidence", "Insurance_fraud_docs");
      openWindow("decryptedEvidence", "manipulation_tapes");
      openWindow("videoEvidence", "Extortion_evidence.mp4");
      setBusy(false);
      return;
    }

    append("error", "Command not found.");
  };

  return (
    <div className="h-full bg-black text-green-400 font-mono text-xs p-3 flex flex-col select-text">
      <div className="flex-1 overflow-auto space-y-1 select-text">
        {lines.map((line, idx) => (
          <pre key={`${line.text}-${idx}`} className={line.type === "error" ? "text-red-400 whitespace-pre-wrap select-text" : "text-green-400 whitespace-pre-wrap select-text"}>
            {line.text}
          </pre>
        ))}
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (busy) return;
          const cmd = input;
          setInput("");
          await runCommand(cmd);
        }}
      >
        <label className="flex items-center gap-2 border-t border-green-900 pt-2">
          <span>$</span>
          <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-transparent outline-none select-text" />
        </label>
      </form>
    </div>
  );
}
