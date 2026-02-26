import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Throttle function - limits how often a function can be called
 * Perfect for scroll events, resize events, etc.
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    let previous = 0;

    return function executedFunction(...args: Parameters<T>) {
        const now = Date.now();
        const remaining = wait - (now - previous);

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

/**
 * Debounce function - delays function execution until after specified time
 * Perfect for search inputs, form submissions, etc.
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func.apply(this, args);
        };

        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * RequestAnimationFrame debounce - uses RAF for smooth 60fps animations
 * Best for scroll/resize events that trigger visual updates
 */
export function rafDebounce<T extends (...args: any[]) => any>(
    func: T
): (...args: Parameters<T>) => void {
    let rafId: number | null = null;
    let lastArgs: Parameters<T> | null = null;

    return function executedFunction(...args: Parameters<T>) {
        lastArgs = args;

        if (rafId !== null) {
            return;
        }

        rafId = requestAnimationFrame(() => {
            if (lastArgs) {
                func.apply(this, lastArgs);
            }
            rafId = null;
        });
    };
}
