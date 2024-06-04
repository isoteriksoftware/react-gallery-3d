import React, { useMemo, Suspense } from "react";
import { GallerySceneProps } from "./GalleryScene.types";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Color } from "three";
import { Ground } from "../Ground";

export const GalleryScene: React.FC<GallerySceneProps> = ({
  backgroundColor = "#000000",
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
  scene,
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

  const background = useMemo(() => new Color(backgroundColor), [backgroundColor]);

  return (
    <Canvas
      gl={{ alpha: false }}
      dpr={[1, 2]}
      camera={{ position: [0, 50, 150], fov: 60, ...(camera as any) }}
      scene={{ background: background, ...(scene as any) }}
      {...rest}
    >
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
