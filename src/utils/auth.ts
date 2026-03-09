import { USERS, UserConfig } from "@/config/users";

export function validateLogin(username: string, password: string): UserConfig | null {
  return USERS.find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  ) ?? null;
}
