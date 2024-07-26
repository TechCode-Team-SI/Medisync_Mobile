import { clsx, ClassValue } from "clsx";

export function cn(...classNames: ClassValue[]) {
  return clsx(classNames);
}
