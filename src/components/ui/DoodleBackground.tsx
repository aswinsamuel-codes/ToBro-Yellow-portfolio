"use client";

import { useEffect, useRef } from "react";

interface Shape {
    x: number;
    y: number;
    size: number;
    type: "spiral" | "wavy" | "zigzag" | "star" | "loop";
    rotation: number;
    speedX: number;
    speedY: number;
    rotationSpeed: number;
}

export default function DoodleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let shapes: Shape[] = [];

        const initShapes = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            shapes = [];
            const shapeCount = 35; // Number of doodles

            for (let i = 0; i < shapeCount; i++) {
                shapes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 20 + 15, // Size between 15 and 35
                    type: ["spiral", "wavy", "zigzag", "star", "loop"][Math.floor(Math.random() * 5)] as Shape["type"],
                    rotation: Math.random() * Math.PI * 2,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    rotationSpeed: (Math.random() - 0.5) * 0.01,
                });
            }
        };

        const drawDoodle = (ctx: CanvasRenderingContext2D, shape: Shape) => {
            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation);
            ctx.lineWidth = 2.5; // Slightly thicker for marker feel
            ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            ctx.beginPath();

            switch (shape.type) {
                case "spiral":
                    // Draw a simple spiral
                    for (let i = 0; i < 30; i++) {
                        const angle = 0.5 * i;
                        const x = (1 + angle) * Math.cos(angle);
                        const y = (1 + angle) * Math.sin(angle);
                        ctx.lineTo(x, y);
                    }
                    break;

                case "wavy":
                    // Draw a wavy line
                    ctx.moveTo(-shape.size, 0);
                    for (let x = -shape.size; x <= shape.size; x += 5) {
                        ctx.lineTo(x, Math.sin(x * 0.2) * 8);
                    }
                    break;

                case "zigzag":
                    // Draw a zigzag
                    ctx.moveTo(-shape.size, -shape.size / 2);
                    ctx.lineTo(-shape.size / 2, shape.size / 2);
                    ctx.lineTo(0, -shape.size / 2);
                    ctx.lineTo(shape.size / 2, shape.size / 2);
                    ctx.lineTo(shape.size, -shape.size / 2);
                    break;

                case "star":
                    // Draw a sketchy 5-point star
                    for (let i = 0; i < 6; i++) {
                        const angle = (i * 4 * Math.PI) / 5;
                        const r = shape.size;
                        const x = r * Math.cos(angle);
                        const y = r * Math.sin(angle);
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    break;

                case "loop":
                    // Draw a loop-de-loop
                    ctx.moveTo(-shape.size, 0);
                    ctx.bezierCurveTo(-shape.size / 2, -shape.size, shape.size / 2, -shape.size, 0, 0);
                    ctx.bezierCurveTo(-shape.size / 2, shape.size, shape.size / 2, shape.size, shape.size, 0);
                    break;
            }

            ctx.stroke();
            ctx.restore();
        };

        const render = () => {
            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);

            shapes.forEach((shape) => {
                shape.x += shape.speedX;
                shape.y += shape.speedY;
                shape.rotation += shape.rotationSpeed;

                // Wrap around screen
                if (shape.x > width + shape.size) shape.x = -shape.size;
                if (shape.x < -shape.size) shape.x = width + shape.size;
                if (shape.y > height + shape.size) shape.y = -shape.size;
                if (shape.y < -shape.size) shape.y = height + shape.size;

                drawDoodle(ctx, shape);
            });

            animationFrameId = requestAnimationFrame(render);
        };

        initShapes();
        render();

        const handleResize = () => {
            initShapes();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50"
        />
    );
}
