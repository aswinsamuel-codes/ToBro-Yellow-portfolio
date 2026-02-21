import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Html, Text } from "@react-three/drei";
import * as THREE from "three";

interface MetricCardProps {
    position: [number, number, number];
    title: string;
    value: string;
    color?: string;
    delay?: number;
}

function MetricCard({ position, title, value, color = "#1d1d1f", delay = 0 }: MetricCardProps) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime();
        ref.current.position.y = position[1] + Math.sin(t * 1 + delay) * 0.1;
    });

    return (
        <group ref={ref} position={position}>
            {/* Glass Card Background */}
            <RoundedBox args={[2.2, 0.8, 0.1]} radius={0.05} smoothness={4}>
                <meshPhysicalMaterial
                    color="white"
                    transparent
                    opacity={0.8}
                    roughness={0}
                    metalness={0.1}
                    transmission={0.6}
                    thickness={0.5}
                />
            </RoundedBox>
            {/* Border Glow */}
            <RoundedBox args={[2.22, 0.82, 0.09]} radius={0.05} smoothness={4}>
                <meshBasicMaterial color="#cccccc" wireframe={false} transparent opacity={0.2} />
            </RoundedBox>

            {/* Text Content (Simplified for Debugging) */}
            <mesh position={[-0.4, 0.15, 0.06]}>
                <planeGeometry args={[1.2, 0.1]} />
                <meshBasicMaterial color="#999" />
            </mesh>
            <mesh position={[-0.2, -0.15, 0.06]}>
                <planeGeometry args={[1.6, 0.2]} />
                <meshBasicMaterial color={color} />
            </mesh>
            {/*
        <Text
            position={[-0.9, 0.15, 0.06]}
            fontSize={0.1}
            color="#666"
            anchorX="left"
        >
            {title}
        </Text>
        <Text
            position={[-0.9, -0.15, 0.06]}
            fontSize={0.2}
            color={color}
            anchorX="left"
            fontWeight="bold"
        >
            {value}
        </Text>
        */}
        </group>
    )
}

function Laptop() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        const t = state.clock.getElapsedTime();
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.sin(t / 2) * 0.1 + 0.1, 0.1);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) * 0.1 - 0.2, 0.1);
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(t / 1.5) * 0.1, 0.1);
    });

    return (
        <group ref={group}>
            {/* Base */}
            <RoundedBox args={[4, 0.2, 2.8]} radius={0.1} smoothness={4} position={[0, -0.1, 0]}>
                <meshStandardMaterial color="#b0b0b0" roughness={0.3} metalness={0.8} />
            </RoundedBox>

            {/* Screen Lid */}
            <group position={[0, 0, -1.2]} rotation={[-0.4, 0, 0]}>
                {/* Lid Back */}
                <RoundedBox args={[4, 2.6, 0.1]} radius={0.1} smoothness={4} position={[0, 1.3, -0.05]}>
                    <meshStandardMaterial color="#a0a0a0" roughness={0.3} metalness={0.8} />
                </RoundedBox>
                {/* Screen Bezel */}
                <RoundedBox args={[3.9, 2.5, 0.05]} radius={0.05} smoothness={4} position={[0, 1.3, 0.01]}>
                    <meshStandardMaterial color="black" roughness={0.2} />
                </RoundedBox>
                {/* Glowing Screen Content - Abstract Dashboard */}
                <mesh position={[0, 1.3, 0.04]}>
                    <planeGeometry args={[3.7, 2.3]} />
                    <meshBasicMaterial color="#ffffff" />
                    {/* Simulated Dashboard UI via CSS Grid Texture? Or simpler geometry */}
                    {/* We'll use a simple colored grid for now to simulate a dashboard */}
                </mesh>
                {/* Abstract UI Elements on Screen */}
                <group position={[-1.2, 1.8, 0.05]}>
                    <mesh>
                        <planeGeometry args={[0.8, 0.4]} />
                        <meshBasicMaterial color="#e5e7eb" />
                    </mesh>
                </group>
                <group position={[0, 1.8, 0.05]}>
                    <mesh>
                        <planeGeometry args={[0.8, 0.4]} />
                        <meshBasicMaterial color="#e5e7eb" />
                    </mesh>
                </group>
                <group position={[1.2, 1.8, 0.05]}>
                    <mesh>
                        <planeGeometry args={[0.8, 0.4]} />
                        <meshBasicMaterial color="#3b82f6" /> {/* Blue accent */}
                    </mesh>
                </group>
                <group position={[0, 0.8, 0.05]}>
                    <mesh>
                        <planeGeometry args={[3.2, 1.2]} />
                        <meshBasicMaterial color="#f3f4f6" />
                    </mesh>
                </group>

            </group>
        </group>
    );
}


export default function Macbook3D() {
    return (
        <group>
            <Float rotationIntensity={0.2} floatIntensity={0.2} floatingRange={[-0.1, 0.1]}>
                <Laptop />
            </Float>

            {/* Floating Metric Cards */}
            <MetricCard
                position={[-2.5, 1, 1.5]}
                title="Revenue Growth"
                value="+137%"
                color="#10b981"
                delay={0}
            />
            <MetricCard
                position={[2.8, -0.5, 1]}
                title="SEO Authority"
                value="Top 1%"
                color="#3b82f6"
                delay={2}
            />
            {/* Mobile Device Mockup */}
            <Float rotationIntensity={0.4} floatIntensity={0.4} position={[2, -1, 1]} rotation={[0, -0.2, 0.1]}>
                <RoundedBox args={[1, 2, 0.1]} radius={0.1} smoothness={4}>
                    <meshStandardMaterial color="#333" roughness={0.2} metalness={0.8} />
                </RoundedBox>
                {/* Screen */}
                <mesh position={[0, 0, 0.06]}>
                    <planeGeometry args={[0.9, 1.9]} />
                    <meshBasicMaterial color="#d1d5db" />
                </mesh>
            </Float>

        </group>
    );
}
