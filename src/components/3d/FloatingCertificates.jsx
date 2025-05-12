import { Canvas } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { Suspense } from "react";

export default function FloatingCertificates() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Html center>
              <div className="w-48 h-32 bg-white shadow-lg border-2 border-gray-300 rounded-xl flex items-center justify-center font-semibold text-sm">
                KCSE Certificate
              </div>
            </Html>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
