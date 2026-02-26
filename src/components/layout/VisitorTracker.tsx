'use client';

import { useVisitorTracking } from '@/hooks/useVisitorTracking';

/**
 * Component that automatically tracks all visitor page views
 * Add this to your root layout for global tracking
 */
export default function VisitorTracker() {
    useVisitorTracking();
    return null;
}
