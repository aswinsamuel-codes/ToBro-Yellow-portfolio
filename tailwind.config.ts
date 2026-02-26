import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#F5F5F7", // Apple Light Gray
                surface: "#FFFFFF",
                primary: "#1D1D1F", // Apple Dark Gray
                secondary: "#86868B", // Apple Medium Gray
                accent: "#0071E3", // Apple Blue
                "accent-hover": "#0077ED",
            },
            fontFamily: {
                sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
            },
            boxShadow: {
                "apple": "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
                "apple-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
                "apple-card": "0 0 20px rgba(0, 0, 0, 0.04)",
                "apple-glass": "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            // GPU acceleration utilities
            willChange: {
                "auto": "auto",
                "scroll": "scroll-position",
                "contents": "contents",
                "transform": "transform",
                "opacity": "opacity",
                "animation": "animation",
            },
            // Fast transitions for smooth interactions
            transitionDuration: {
                "100": "100ms",
                "150": "150ms",
                "200": "200ms",
            },
        },
    },
    plugins: [
        // Add GPU acceleration plugin
        function ({ addUtilities }: any) {
            const newUtilities = {
                '.gpu-accelerate': {
                    'transform': 'translateZ(0)',
                    'backface-visibility': 'hidden',
                    'perspective': '1000px',
                },
                '.smooth-gpu': {
                    'transform': 'translate3d(0, 0, 0)',
                    'will-change': 'transform',
                    'backface-visibility': 'hidden',
                },
                '.smooth-opacity': {
                    'will-change': 'opacity',
                },
                '.performance-mode': {
                    'image-rendering': 'crisp-edges',
                    'text-rendering': 'geometricPrecision',
                },
            };
            addUtilities(newUtilities);
        },
    ],
};
export default config;
