import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export { getSiteUrl } from './get-site-url';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
