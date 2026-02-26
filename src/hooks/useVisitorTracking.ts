'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Hook to track visitor IP address and page views
 */
export function useVisitorTracking() {
    const pathname = usePathname();

    useEffect(() => {
        const trackVisitor = async () => {
            try {
                await fetch('/api/track-visitor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        page: pathname,
                        action: 'page_view',
                    }),
                });
            } catch (error) {
                // Silently fail - don't interrupt user experience
                console.debug('Visitor tracking failed:', error);
            }
        };

        trackVisitor();
    }, [pathname]);
}
