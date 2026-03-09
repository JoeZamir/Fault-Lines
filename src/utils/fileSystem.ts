export interface FSNode {
  folders?: string[];
  files?: string[];
  children?: Record<string, FSNode>;
}

export const FILE_SYSTEM: Record<string, FSNode> = {
  C: { folders: ["Windows", "Program Files", "Users"], files: ["pagefile.sys"] },
  D: { folders: ["Games", "Documents", "Backups"], files: ["readme.txt"] },
  "A: archive_": {
    folders: ["FAULT LINES"],
    files: [],
    children: {
      "FAULT LINES": {
        folders: ["xj29af", "k92kf1", "z9aa21", "hidden"],
        files: ["hfgr0.bin"],
        children: {
          xj29af: { folders: [], files: ["data_01.enc", "manifest.json"] },
          k92kf1: { folders: [], files: ["trace.log", "sig.hash"] },
          z9aa21: { folders: [], files: ["payload.bin"] },
          hidden: { folders: [], files: [] },
        },
      },
    },
  },
};

export const ENCRYPTED_DRIVES = ["A: archive_"];
export const DRIVE_PASSWORD = "John 8:32";
