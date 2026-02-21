/** @type {import('next').NextConfig} */
const nextConfig = {
    // Faster production builds & smaller bundles
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    // Image optimization
    images: {
        formats: ["image/avif", "image/webp"],
    },
    // Optimize 3rd party packages
    experimental: {
        optimizePackageImports: ["framer-motion", "lucide-react", "@react-three/fiber", "@react-three/drei"],
    },
};

export default nextConfig;
