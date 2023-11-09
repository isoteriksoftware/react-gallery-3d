import { GroundProps } from "./Ground.types";
import { MeshReflectorMaterial } from "@react-three/drei";

const Ground = ({
  width = 1000,
  height = 1000,
  reflectorMaterial,
  disableReflector,
  ...rest
}: GroundProps) => {
  const {
    color = "#ffffff",
    mirror = 0.5,
    resolution = 1024,
    depthScale = 1,
    minDepthThreshold = 0.4,
    maxDepthThreshold = 1,
    roughness = 1,
    metalness = 0.7,
    blur = [400, 100],
    ...restReflectorMaterial
  } = reflectorMaterial || {};

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} {...rest}>
      <planeGeometry args={[width, height]} />

      {!disableReflector && (
        <MeshReflectorMaterial
          color={color}
          blur={blur}
          mirror={mirror}
          resolution={resolution}
          depthScale={depthScale}
          minDepthThreshold={minDepthThreshold}
          maxDepthThreshold={maxDepthThreshold}
          roughness={roughness}
          metalness={metalness}
          {...restReflectorMaterial}
        />
      )}
    </mesh>
  );
};

export default Ground;
