import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Trail, Billboard } from '@react-three/drei';
import * as THREE from 'three';

interface CometProps {
    radiusX: number;
    radiusZ: number;
    speed: number;
    startAngle: number;
    color: string;
    image: string;
    orbitRotation: [number, number, number];
    onClick?: () => void;
}

// Simple linear interpolation helper
const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
};

export default function Comet({ radiusX, radiusZ, speed, startAngle, color, image, orbitRotation, onClick }: CometProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const angleRef = useRef(startAngle);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Orbital motion along the local XZ plane
            angleRef.current += speed * delta;

            const x = Math.cos(angleRef.current) * radiusX;
            const z = Math.sin(angleRef.current) * radiusZ;

            meshRef.current.position.set(x, 0, z);

            // Smooth scale on hover using simple lerp
            const targetScale = hovered ? 2 : 1;
            const smoothFactor = 5 * delta; // Adjust speed
            meshRef.current.scale.x = lerp(meshRef.current.scale.x, targetScale, smoothFactor);
            meshRef.current.scale.y = lerp(meshRef.current.scale.y, targetScale, smoothFactor);
            meshRef.current.scale.z = lerp(meshRef.current.scale.z, targetScale, smoothFactor);
        }
    });

    return (
        <group rotation={orbitRotation}> {/* Tilt the entire orbit */}
            <mesh
                ref={meshRef}
                onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
                onClick={(e) => {
                    e.stopPropagation();
                    if (onClick) onClick();
                }}
            >
                {/* <sphereGeometry args={[0.08, 8, 8]} /> 
                        <meshBasicMaterial color={color} toneMapped={false} /> */}

                {/* Linked Memory Image */}
                <Billboard position={[0, 0.5, 0]}>
                    <Image
                        url={image}
                        scale={hovered ? 0.6 : 0.5}
                        opacity={hovered ? 1 : 0.8}
                        transparent
                    />
                </Billboard>
            </mesh>

        </group>
    );
}
