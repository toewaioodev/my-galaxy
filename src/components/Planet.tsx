import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Stars, Float, Sparkles, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Planet() {
    const planetRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);

    // Create romantic particle system
    const particles = useMemo(() => {
        const count = 500;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const radius = 2 + Math.random() * 1.5;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.cos(phi);
            positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

            // Romantic colors (pink, purple, soft blue)
            const color = new THREE.Color();
            color.setHSL(
                0.8 + Math.random() * 0.2, // Purple-pink hues
                0.6 + Math.random() * 0.4,
                0.6 + Math.random() * 0.4
            );
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        return { positions, colors };
    }, []);

    useFrame((state, delta) => {
        if (planetRef.current) {
            planetRef.current.rotation.y += 0.002;
            // Gentle pulsing animation
            planetRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.02);
        }

        if (atmosphereRef.current) {
            atmosphereRef.current.rotation.y -= 0.001;
        }

        if (glowRef.current) {
            // Glow pulse effect
            const pulse = 0.9 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
            const material = glowRef.current.material as THREE.MeshBasicMaterial;
            material.opacity = 0.2 * pulse;
        }

        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.001;
        }

        state.camera.lookAt(0, 0, 0);
    });

    return (
        <group>
            {/* Background Stars - Reduced count for performance */}
            <Stars
                radius={100}
                depth={50}
                count={2000} // Reduced from 5000
                factor={4}
                saturation={0}
                fade
                speed={1}
            />

            <Float
                speed={2}
                rotationIntensity={0.5}
                floatIntensity={0.5}
                floatingRange={[-0.1, 0.1]}
            >
                {/* Main Planet Surface - Optimized geometry */}
                <Sphere ref={planetRef} args={[1.3, 64, 64]}> {/* Reduced from 128 */}
                    <meshStandardMaterial
                        color="#ff6bcb"
                        emissive="#ff1493"
                        emissiveIntensity={0.8}
                        roughness={0.4}
                        metalness={0.3}
                    />
                </Sphere>

                {/* Sparkles on planet surface */}
                <Sparkles
                    count={50} // Reduced from 100
                    scale={1.5}
                    size={1.5}
                    speed={0.4}
                    color="#ffd700"
                />

                {/* Core Glow */}
                <Sphere args={[1.4, 32, 32]}>
                    <meshBasicMaterial
                        color="#f791c4ff"
                        transparent
                        opacity={0.3}
                        blending={THREE.AdditiveBlending}
                    />
                </Sphere>

                {/* Atmospheric Glow (Outer) */}
                <Sphere ref={atmosphereRef} args={[1.8, 32, 32]}> {/* Reduced geometry */}
                    <meshPhongMaterial
                        color="#f092c4ff"
                        transparent
                        opacity={0.2}
                        blending={THREE.AdditiveBlending}
                        side={THREE.BackSide}
                    />
                </Sphere>


            </Float>

            {/* Distant Sparkles */}
            <Sparkles
                count={100} // Reduced from 200
                scale={20}
                size={0.8}
                speed={0.3}
                opacity={0.6}
                color="#ffb6c1"
            />
        </group>
    );
}