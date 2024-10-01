import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

export function isValidShortUrl(shortUrl: string): boolean {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(shortUrl);
}
