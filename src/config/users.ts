export interface UserConfig {
  username: string;
  password: string;
  desktopIcons: string[];
}

export const USERS: UserConfig[] = [
  {
    username: "Joseph",
    password: "joseph",
    desktopIcons: ["encryptionTool"],
  },
  {
    username: "Titus",
    password: "titus",
    desktopIcons: ["fileExplorer"],
  },
  {
    username: "Naomi",
    password: "naomi",
    desktopIcons: ["naomiWorkspace"],
  },
];
