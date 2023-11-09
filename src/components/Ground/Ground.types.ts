import { MeshProps } from "@react-three/fiber";
import { Texture } from "three";

export interface GroundProps extends MeshProps {
  width?: number;
  height?: number;
  reflectorMaterial?: {
    color?: string;
    roughness?: number;
    metalness?: number;
    resolution?: number;
    mixBlur?: number;
    mixStrength?: number;
    blur?: [number, number] | number;
    mirror?: number;
    minDepthThreshold?: number;
    maxDepthThreshold?: number;
    depthScale?: number;
    depthToBlurRatioBias?: number;
    distortionMap?: Texture;
    distortion?: number;
    mixContrast?: number;
    reflectorOffset?: number;
  };
  disableReflector?: boolean;
}
