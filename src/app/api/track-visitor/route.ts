import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * Extract IP address from request headers
 * Handles proxies and different hosting environments
 */
function getClientIP(request: NextRequest): string {
    // Check for IP from Vercel
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    // Check for IP from Cloudflare
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    if (cfConnectingIP) {
        return cfConnectingIP;
    }

    // Check for IP from other proxies
    const xRealIP = request.headers.get('x-real-ip');
    if (xRealIP) {
        return xRealIP;
    }

    // Fallback to socket address (works locally)
    return request.ip || 'Unknown';
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const clientIP = getClientIP(request);
        const userAgent = request.headers.get('user-agent') || 'Unknown';
        const referer = request.headers.get('referer') || 'Direct';

        // Extract page info from request body
        const { page, action } = body;

        // Store visitor data in Supabase
        const { data, error } = await supabase
            .from('visitors')
            .insert([
                {
                    ip_address: clientIP,
                    user_agent: userAgent,
                    page_path: page || '/',
                    action: action || 'page_view',
                    referrer: referer,
                    visited_at: new Date().toISOString(),
                }
            ]);

        if (error) {
            console.error('Error tracking visitor:', error);
            return NextResponse.json(
                { error: 'Failed to track visitor' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, ip: clientIP },
            { status: 200 }
        );
    } catch (error) {
        console.error('Tracking error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    // GET endpoint to retrieve visitor analytics
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '100');

        const { data, error } = await supabase
            .from('visitors')
            .select('*')
            .order('visited_at', { ascending: false })
            .limit(limit);

        if (error) {
            return NextResponse.json(
                { error: 'Failed to fetch visitors' },
                { status: 500 }
            );
        }

        return NextResponse.json({ visitors: data }, { status: 200 });
    } catch (error) {
        console.error('Error fetching visitors:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
