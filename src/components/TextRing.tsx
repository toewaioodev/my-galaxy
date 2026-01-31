import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface CircularTextProps {
    text: string;
    radius: number;
    [key: string]: any;
}

function CircularText({ text, radius, ...props }: CircularTextProps) {
    const letters = text.split('');
    const angleStep = (Math.PI * 2) / letters.length;

    return (
        <group {...props}>
            {letters.map((letter, i) => {
                const angle = -i * angleStep;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                return (
                    <Text
                        key={i}
                        position={[x, 0, z]}
                        rotation={[0, -angle + Math.PI / 2, 0]} // Face outward like a curved label
                        fontSize={0.3} // Larger font
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.02}
                        outlineColor="#ff00cc"
                    >
                        {letter}
                        <meshStandardMaterial
                            attach="material"
                            color="#ffffff"
                            emissive="#ff00cc"
                            emissiveIntensity={0.5}
                            toneMapped={false}
                            side={THREE.DoubleSide}
                        />
                    </Text>
                );
            })}
        </group>
    );
}

export default function TextRing() {
    const ring1Ref = useRef<THREE.Group>(null);
    const ring2Ref = useRef<THREE.Group>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        // Rotate the inner rings only
        if (ring1Ref.current) {
            ring1Ref.current.rotation.y -= 0.005;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.y += 0.005;
        }
        // Optional: Gentle wobble on the entire container?
        // keeping it simple for now to ensure "rotate like first ring" is accurate
    });

    return (
        <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Primary Ring Node */}
            <group rotation={[0.3, 0, 0]}> {/* Static Tilt */}
                <group ref={ring1Ref}> {/* Animated Spin */}
                    <CircularText
                        text="YOU ARE MY UNIVERSE • MY LOVE • MY GALAXY •"
                        radius={2.5}
                    />
                </group>
            </group>

            {/* Secondary Cross Ring Node */}
            <group rotation={[0.5, 0, Math.PI / 2]}> {/* Static Tilt: 90 deg twisted + slight tilt */}
                <group ref={ring2Ref}> {/* Animated Spin */}
                    <CircularText
                        text="FOREVER YOURS • INFINITE LOVE • ETERNAL •"
                        radius={3}
                    />
                </group>
            </group>
        </group>
    );
}
