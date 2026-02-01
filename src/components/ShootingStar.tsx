import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

function SingleShootingStar() {
    const ref = useRef<THREE.Mesh>(null);
    const [active, setActive] = useState(false);
    const [startPos] = useState(() => new THREE.Vector3());

    useFrame((state, delta) => {
        // Random activation
        if (!active && Math.random() < 0.005) {
            // Calculate random start position
            startPos.set(
                (Math.random() * 100) + 50,  // Start far right
                (Math.random() - 0.5) * 80,  // Wide vertical
                (Math.random() - 0.5) * 60 - 20 // Background
            );
            setActive(true);
        }

        if (active && ref.current) {
            ref.current.position.x -= delta * 15; // Move left fast
            ref.current.position.y -= delta * 2; // Slight dip

            if (ref.current.position.x < -100) {
                setActive(false);
            }
        }
    });

    return (
        <group>
            {active && (
                <Trail width={4} length={6} color={new THREE.Color("#ff00cc").multiplyScalar(2)} attenuation={(t) => t}>
                    <mesh ref={ref} position={startPos}>
                        <sphereGeometry args={[0.08]} />
                        <meshBasicMaterial color={new THREE.Color("red").multiplyScalar(2)} toneMapped={false} />
                    </mesh>
                </Trail>
            )}
        </group>
    );
}

export default function ShootingStars() {
    return (
        <>
            <SingleShootingStar />
            <SingleShootingStar />
            <SingleShootingStar />
        </>
    )
}
