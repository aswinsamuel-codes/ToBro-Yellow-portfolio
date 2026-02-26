import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * Hook for admin access via keyboard shortcut
 * Default: Ctrl+Shift+A (or Cmd+Shift+A on Mac)
 */
export function useAdminShortcut(shortcutKey: string = "KeyA") {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Prevent admin access on admin pages
            if (pathname?.startsWith("/admin")) return;

            // Check for Ctrl/Cmd + Shift + specified key
            const isCtrlOrCmd = event.ctrlKey || event.metaKey;
            const isShift = event.shiftKey;
            const isCorrectKey = event.code === shortcutKey;

            if (isCtrlOrCmd && isShift && isCorrectKey) {
                event.preventDefault();
                router.push("/admin/login");
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [pathname, router, shortcutKey]);
}
