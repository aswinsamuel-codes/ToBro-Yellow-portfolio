"use client";

import { useEffect, useRef } from "react";

interface Shape {
    x: number;
    y: number;
    size: number;
    type: "cross" | "circle" | "square" | "line";
    rotation: number;
    speedX: number;
    speedY: number;
    rotationSpeed: number;
}

export default function SprinkleBackground() {
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
            const shapeCount = 40; // Number of sprinkles

            for (let i = 0; i < shapeCount; i++) {
                shapes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 10 + 5, // Size between 5 and 15
                    type: ["cross", "circle", "square", "line"][Math.floor(Math.random() * 4)] as Shape["type"],
                    rotation: Math.random() * Math.PI * 2,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    rotationSpeed: (Math.random() - 0.5) * 0.02,
                });
            }
        };

        const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";

            switch (shape.type) {
                case "cross":
                    ctx.beginPath();
                    ctx.moveTo(-shape.size, 0);
                    ctx.lineTo(shape.size, 0);
                    ctx.moveTo(0, -shape.size);
                    ctx.lineTo(0, shape.size);
                    ctx.stroke();
                    break;
                case "circle":
                    ctx.beginPath();
                    ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
                    ctx.stroke();
                    break;
                case "square":
                    ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                    break;
                case "line":
                    ctx.beginPath();
                    ctx.moveTo(-shape.size, 0);
                    ctx.lineTo(shape.size, 0);
                    ctx.stroke();
                    break;
            }

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

                drawShape(ctx, shape);
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
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-60"
        />
    );
}
