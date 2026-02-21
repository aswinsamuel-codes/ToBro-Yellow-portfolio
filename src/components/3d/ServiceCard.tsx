"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface ServiceCardProps {
    position: [number, number, number];
    title: string;
    description: string;
    icon: string;
    color: string;
    onClick: () => void;
}

export default function ServiceCard({ position, title, description, icon, color, onClick }: ServiceCardProps) {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Gentle hover float
        const t = state.clock.getElapsedTime();
        meshRef.current.position.y = position[1] + (hovered ? 0.2 : Math.sin(t + position[0]) * 0.1);

        // Tilt towards mouse
        if (hovered) {
            const x = (state.mouse.x * window.innerWidth) / 2;
            const y = (state.mouse.y * window.innerHeight) / 2;
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -state.mouse.y * 0.2, 0.1);
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, state.mouse.x * 0.2, 0.1);
        } else {
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
        }
    });

    return (
        <group
            ref={meshRef}
            position={position}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
            onClick={onClick}
        >
            {/* Glass Card Body */}
            <RoundedBox args={[3, 4, 0.2]} radius={0.2} smoothness={4}>
                <meshPhysicalMaterial
                    color={hovered ? "#ffffff" : "#f7f7f7"}
                    roughness={0.1}
                    metalness={0.1}
                    transmission={0.95}
                    thickness={2}
                    transparent
                    opacity={0.9}
                    clearcoat={1}
                />
            </RoundedBox>

            {/* Accent Border */}
            <RoundedBox args={[3.05, 4.05, 0.15]} radius={0.2} smoothness={4} position={[0, 0, -0.05]}>
                <meshBasicMaterial color={color} transparent opacity={hovered ? 0.4 : 0.1} />
            </RoundedBox>

            {/* 3D Text Content */}
            <group position={[-1.2, 1.5, 0.15]}>
                {/* Icon Container (Analogue) */}
                <mesh position={[0.4, 0, 0]}>
                    <circleGeometry args={[0.4, 32]} />
                    <meshBasicMaterial color={color} transparent opacity={0.2} />
                </mesh>
                <Text
                    position={[0.4, 0, 0.01]}
                    fontSize={0.4}
                    color={color}
                    anchorX="center"
                    anchorY="middle"
                >
                    {icon}
                </Text>

                {/* Title */}
                <Text
                    position={[0, -0.8, 0]}
                    fontSize={0.25}
                    color="#1d1d1f"
                    anchorX="left"
                    maxWidth={2.4}
                >
                    {title}
                </Text>

                {/* Description */}
                <Text
                    position={[0, -1.4, 0]}
                    fontSize={0.15}
                    color="#86868b"
                    anchorX="left"
                    maxWidth={2.4}
                    lineHeight={1.4}
                >
                    {description}
                </Text>

                {/* Click to know more CTA */}
                <Text
                    position={[0, -2, 0]}
                    fontSize={0.1}
                    color={color}
                    anchorX="left"
                    maxWidth={2.4}
                    fontStyle="italic"
                >
                    Click to know more &rarr; to view what&apos;s inside
                </Text>
            </group>
        </group>
    );
}
