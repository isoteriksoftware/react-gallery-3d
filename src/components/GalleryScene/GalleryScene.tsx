import React, { useMemo, Suspense } from "react";
import { CarouselSceneProps } from "./GalleryScene.types";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Gallery } from "../Gallery";
import { Color } from "three";

const GalleryScene: React.FC<CarouselSceneProps> = ({
  backgroundColor = "#000000",
  fogColor = "#000000",
  gallery,
  orbitControls,
  children,
  disableControls,
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

  const background = useMemo(() => new Color(backgroundColor), [backgroundColor]);

  return (
    <Canvas
      gl={{ alpha: false }}
      dpr={[1, 2]}
      camera={{ position: [0, 50, 150], fov: 60 }}
      scene={{ background: background }}
      {...rest}
    >
      <fog attach="fog" color={fogColor} near={10} far={400} />

      <Suspense fallback={null}>
        <Gallery {...gallery} />
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

        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
};

export default GalleryScene;
