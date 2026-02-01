import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

// Individual star in the shower
function ShowerStar({ delay, onComplete }: { delay: number, onComplete?: () => void }) {
    const ref = useRef<THREE.Mesh>(null);
    const [active, setActive] = useState(false);
    const [finished, setFinished] = useState(false);
    const [startPos] = useState(() => new THREE.Vector3(
        (Math.random() * 100) + 50,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60 - 20
    ));
    // Each star has slightly different characteristics
    const [speed] = useState(() => 20 + Math.random() * 15);

    useFrame((state, delta) => {
        if (finished) return;

        // Check if it's time to start (using clock time relative to component mount isn't easy without passing start time)
        // Instead, let's use a simple waiting logic if not active
        if (!active) {
            // We use a mutable ref for timing or just check against global clock if we knew start time.
            // Simpler: Parent handles delay? No, better self-contained.
            // Let's use a countdown in refs or rely on state.clock if available.
            // Actually, we can just use a setTimeout effect for the delay start.
            return;
        }

        if (ref.current) {
            ref.current.position.x -= delta * speed;
            ref.current.position.y -= delta * 2;

            if (ref.current.position.x < -100) {
                setActive(false);
                setFinished(true);
                if (onComplete) onComplete();
            }
        }
    });

    // Activate after delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setActive(true);
        }, delay * 1000);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!active || finished) return null;

    return (
        <group>
            <Trail width={5} length={8} color={new THREE.Color("#ff00cc").multiplyScalar(3)} attenuation={(t) => t}>
                <mesh ref={ref} position={startPos}>
                    <sphereGeometry args={[0.08]} />
                    <meshBasicMaterial color={new THREE.Color("red").multiplyScalar(5)} toneMapped={false} />
                </mesh>
            </Trail>
        </group>
    );
}

export default function MeteorShower() {
    const [started, setStarted] = useState(false);

    // Config: 20 stars
    const starCount = 20;
    const stars = Array.from({ length: starCount }).map((_, i) => ({
        id: i,
        // Random delay between 0 and 3 seconds for the "shower" duration
        delay: Math.random() * 3
    }));

    useEffect(() => {
        // Start the shower event after 5 seconds (once intro is likely done)
        const startTimer = setTimeout(() => {
            setStarted(true);
        }, 5000);

        return () => clearTimeout(startTimer);
    }, []);

    if (!started) return null;

    return (
        <group>
            {stars.map((star) => (
                <ShowerStar key={star.id} delay={star.delay} />
            ))}
        </group>
    );
}
