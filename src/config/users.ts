export interface UserConfig {
  username: string;
  password: string;
  desktopIcons: string[];
  wallpaper: string;
}

export const USERS: UserConfig[] = [
  {
    username: "Joseph",
    password: "joseph",
    desktopIcons: ["encryptionTool"],
    wallpaper: "/joseph-wallpaper.png",
  },
  {
    username: "Titus",
    password: "titus",
    desktopIcons: ["fileExplorer"],
    wallpaper: "/titus-wallpaper.png",
  },
  {
    username: "Naomi",
    password: "naomi",
    desktopIcons: ["naomiWorkspace"],
    wallpaper: "/wallpaper.jpg",
  },
];
