/** @type {import('next').NextConfig} */
const nextConfig = {
    // Faster production builds & smaller bundles
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    // Image optimization
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    // Optimize 3rd party packages
    experimental: {
        optimizePackageImports: ["framer-motion", "lucide-react", "@react-three/fiber", "@react-three/drei"],
    },
    // Performance optimizations
    swcMinify: true,
    poweredByHeader: false,
    compress: true,
    // Generate ETags for static files
    generateEtags: true,
    // Optimize for faster initial page load
    reactStrictMode: false, // Disable strict mode in production for performance
    productionBrowserSourceMaps: false,
    // Optimize font loading
    optimizeFonts: true,
};

export default nextConfig;
