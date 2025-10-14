import type { User } from "../types";
export const LS_KEY = "kwol_users_v1";
export function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}
export function saveUsers(users: User[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(users));
}
