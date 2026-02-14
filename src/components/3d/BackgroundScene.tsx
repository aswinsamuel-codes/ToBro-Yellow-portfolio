"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingShape({ position, color }: { position: [number, number, number]; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.006;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                <dodecahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} opacity={0.8} transparent />
            </mesh>
        </Float>
    );
}

export default function BackgroundScene() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-40">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <FloatingShape position={[-3, 2, 0]} color="#111111" />
                <FloatingShape position={[3, -2, -2]} color="#333333" />
                <FloatingShape position={[0, 0, -5]} color="#000000" />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
