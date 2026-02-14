# ToBro Agency 3D Website

This is a modern 3D animated website for ToBro Agency, built with Next.js, Tailwind CSS, Three.js, and Framer Motion.

## Getting Started

1.  **Install Dependencies**
    Since the automatic installation might have been interrupted such as due to network issues, please ensure all dependencies are installed:
    ```bash
    npm install
    ```

2.  **Run the Development Server**
    ```bash
    npm run dev
    ```

3.  **Open the Website**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

-   **3D Background**: Interactive floating shapes using Three.js (`@react-three/fiber`).
-   **Smooth Scrolling**: Implemented using `lenis`.
-   **Animations**: Scroll-triggered reveals and effects using `framer-motion` and `gsap`.
-   **Responsive Design**: Fully responsive layout for all devices.
-   **Modern UI**: Glassmorphism, glow effects, and minimal typography.

## Project Structure

-   `src/app`: Page logic and global styles.
-   `src/components/3d`: Three.js scenes and components.
-   `src/components/sections`: Landing page sections (Hero, About, Services, etc.).
-   `src/components/ui`: UI components like Navbar.
-   `src/components/layout`: Layout wrappers like SmoothScroll.
