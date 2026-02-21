"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import Macbook3D from "@/components/3d/Macbook3D";

export default function Hero3D() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 2]}>
                {/* Lighting: Studio Soft */}
                <ambientLight intensity={1.5} />
                <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -5, 5]} intensity={1} color="white" />

                <Macbook3D />

                {/* Environment for Reflections */}
                <Environment preset="city" />

                {/* Shadow */}
                <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={15} blur={2.5} far={4} color="#000000" />
            </Canvas>
        </div>
    );
}
