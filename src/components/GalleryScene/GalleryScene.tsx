import React, { Suspense } from "react";
import { GallerySceneProps } from "./GalleryScene.types";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Ground } from "../Ground";

export const GalleryScene: React.FC<GallerySceneProps> = ({
  backgroundColor,
  orbitControls,
  children,
  disableControls,
  disableFog,
  disableEnvironment,
  fog,
  environment,
  ground,
  disableGround,
  camera,
  suspenseFallback,
  ...rest
}) => {
  const {
    enableDamping = true,
    enableZoom = true,
    dampingFactor = 0.01,
    autoRotate = true,
    autoRotateSpeed = -1,
    ...restOrbitControls
  } = orbitControls || {};

  const { color: fogColor = "#000000", near = 10, far = 400, ...restFogProps } = fog || {};

  return (
    <Canvas
      gl={{ alpha: false }}
      dpr={[1, 2]}
      camera={{ position: [0, 50, 150], fov: 60, ...(camera as any) }}
      {...rest}
    >
      {backgroundColor && <color attach="background" args={[backgroundColor]} />}

      {!disableGround && <Ground position={[0, -25, 0]} {...ground} />}

      {!disableFog && <fog attach="fog" color={fogColor} near={near} far={far} {...restFogProps} />}

      <Suspense fallback={suspenseFallback}>
        {children}

        {!disableControls && (
          <OrbitControls
            enableDamping={enableDamping}
            enableZoom={enableZoom}
            dampingFactor={dampingFactor}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            minPolarAngle={Math.PI / 2 - 0.5}
            maxPolarAngle={Math.PI / 2 - 0.01}
            {...restOrbitControls}
          />
        )}

        {!disableEnvironment && <Environment preset="sunset" {...environment} />}
      </Suspense>
    </Canvas>
  );
};
