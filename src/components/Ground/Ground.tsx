import { GroundProps } from "./Ground.types";
import { MeshReflectorMaterial } from "@react-three/drei";
import React from "react";
import { Mesh } from "three";

/**
 * The Ground component.
 * This component is a wrapper around the mesh component, and it renders a plane geometry with a reflector material.
 * The reflector material is used to create a reflective ground and is only rendered if the disableReflector prop is not set to true.
 *
 * @param width The width of the ground.
 * @param height The height of the ground.
 * @param reflectorMaterial The reflector material properties.
 * @param disableReflector Whether to disable the reflector material.
 */
const Ground = React.forwardRef<Mesh, GroundProps>(
  ({ width = 1000, height = 1000, reflectorMaterial, disableReflector, ...rest }, ref) => {
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
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} {...rest}>
        <planeGeometry args={[width, height]} />
        {disableReflector && (
          <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
        )}

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
  },
);

export default Ground;
