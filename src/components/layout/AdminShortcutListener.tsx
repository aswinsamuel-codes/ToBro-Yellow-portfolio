"use client";

import { useAdminShortcut } from "@/hooks/useAdminShortcut";

/**
 * Component to listen for admin access shortcut globally
 * Shortcut: Ctrl+Shift+A (or Cmd+Shift+A on Mac)
 */
export default function AdminShortcutListener() {
    useAdminShortcut("KeyA");
    return null;
}
