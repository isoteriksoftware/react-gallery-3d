import { MeshProps } from "@react-three/fiber";
import { Texture } from "three";

/**
 * The Ground component properties.
 */
export interface GroundProps extends Omit<MeshProps, "ref"> {
  /**
   * The width ground.
   *
   * @default 1000
   */
  width?: number;

  /**
   * The height ground.
   *
   * @default 1000
   */
  height?: number;

  /**
   * The MeshReflectorMaterial properties.
   */
  reflectorMaterial?: {
    /**
     * The color of the ground.
     *
     * @default "#ffffff"
     */
    color?: string;

    /**
     * The roughness of the ground.
     *
     * @default 1
     */
    roughness?: number;

    /**
     * The metalness of the ground.
     *
     * @default 0.7
     */
    metalness?: number;

    /**
     * The resolution of the ground.
     *
     * @default 1024
     */
    resolution?: number;

    /**
     * The mixBlur of the reflector.
     */
    mixBlur?: number;

    /**
     * The mixStrength of the reflector.
     */
    mixStrength?: number;

    /**
     * The blur of the reflector.
     *
     * @default [400, 100]
     */
    blur?: [number, number] | number;

    /**
     * The mirror strength of the reflector.
     *
     * @default 0.5
     */
    mirror?: number;

    /**
     * The min depth threshold of the reflector.
     *
     * @default 0.4
     */
    minDepthThreshold?: number;

    /**
     * The max depth threshold of the reflector.
     *
     * @default 1
     */
    maxDepthThreshold?: number;

    /**
     * The depth scale of the reflector.
     *
     * @default 1
     */
    depthScale?: number;

    /**
     * The depth to blur ratio bias of the reflector.
     */
    depthToBlurRatioBias?: number;

    /**
     * The texture of the distortion map.
     */
    distortionMap?: Texture;

    /**
     * The distortion scale of the reflector.
     */
    distortion?: number;

    /**
     * The mix contrast of the reflector.
     */
    mixContrast?: number;

    /**
     * The reflector offset.
     */
    reflectorOffset?: number;
  };

  /**
   * Whether to disable the reflector.
   * When disabled, the ground will be a simple plane with a standard material.
   *
   * @default false
   */
  disableReflector?: boolean;
}
