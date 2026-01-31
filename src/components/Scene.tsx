import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import Planet from './Planet';
import TextRing from './TextRing';
import StarField from './StarField';
import Comet from './Comet';
import ShootingStars from './ShootingStar';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function IntroCamera({ onFinish }: { onFinish: () => void }) {
    useFrame((state) => {
        // Linear interpolation or smoothstep could work, but let's use a simple damp effect
        // Target Z is 16, Start Z is around 3.
        // We want this to happen over time. using clamp to ensure it stops.

        // Let's use standard lerp for smoothness based on global time to ensure consistency
        // But simple convergence is easier: move current toward target.
        const targetZ = 16;

        if (state.camera.position.z < targetZ - 0.1) {
            state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.02);
            state.camera.updateProjectionMatrix();
        } else {
            // Finished
            onFinish();
        }
    });
    return null;
}

export default function Scene() {
    const [introFinished, setIntroFinished] = useState(false);

    return (
        <Canvas
            camera={{ position: [0, 0, 2], fov: 45 }} // Start text camera CLOSE (z=2)
            dpr={[1, 1.5]}
            gl={{ antialias: true }}
        >
            <Suspense fallback={null}>
                <ShootingStars />
                <color attach="background" args={['#050505']} />

                {/* Animation Controller */}
                {!introFinished && <IntroCamera onFinish={() => setIntroFinished(true)} />}

                {/* Cinematic Controls - Enabled only after intro */}
                <OrbitControls
                    enabled={introFinished}
                    enablePan={false}
                    enableZoom={true}
                    maxDistance={25}
                    minDistance={3}
                    autoRotate={introFinished} // Only auto rotate after intro
                    autoRotateSpeed={0.5}
                    zoomSpeed={0.5}
                    rotateSpeed={0.5}
                    dampingFactor={0.05}
                />

                {/* Ambient & Atmosphere Lighting */}
                <ambientLight intensity={0.5} color="#2a0a40" />
                <pointLight position={[10, 10, 5]} intensity={1.5} color="#ffccff" />
                <pointLight position={[-10, -5, -5]} intensity={0.5} color="#4b0082" />

                {/* Core Elements */}
                <Planet />
                <TextRing />

                {/* Background Stars - Note: Additional Stars are in Planet.tsx */}
                <StarField />
                {/* <Stars /> removed to prevent duplication overload */}

                {/* Shooting Stars */}


                {/* Memory Comets */}
                {Array.from({ length: 350 }).map((_, i) => {
                    // Define your list of memory images here
                    const memories = [
                        "/cp-1.jpeg",
                        "/cp-2.jpeg",
                        "/cp-3.jpeg",
                        // Add more filenames here as you add them to the public folder
                        // "/photo1.jpg",
                        // "/photo2.jpg" 
                    ];

                    const randomImage = memories[i % memories.length]; // Cycle through images

                    return (
                        <Comet
                            key={i}
                            radiusX={4 + Math.random() * 4}
                            radiusZ={4 + Math.random() * 4}
                            speed={0.1 + Math.random() * 0.01}
                            startAngle={Math.random() * Math.PI * 2}
                            color={["#ff66cc", "#9d4edd", "#00ccff", "#ffcc00"][Math.floor(Math.random() * 4)]}
                            image={randomImage}
                            orbitRotation={[
                                (Math.random() - 0.5) * 0.1,
                                9,
                                (Math.random() - 0.5) * 0.2 + 0.3
                            ]}
                        />
                    );
                })}

            </Suspense>
        </Canvas>
    );
}
