import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Property3DViewer = ({ modelUrl }) => {
    const { scene } = useGLTF(modelUrl);

    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={<p>Loading 3D model...</p>}>
                <primitive object={scene} scale={1.5} />
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
};

export default Property3DViewer;
