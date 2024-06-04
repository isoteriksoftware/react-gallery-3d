import { CanvasProps, FogProps } from "@react-three/fiber";
import { ReactNode } from "react";
import { EnvironmentProps, OrbitControlsProps } from "@react-three/drei";
import { GroundProps } from "../Ground";
import { ColorRepresentation } from "three";

/**
 * The GalleryScene component properties.
 */
export type GallerySceneProps = Omit<CanvasProps, "children"> & {
  /**
   * The children to render.
   *
   * @default undefined
   */
  children?: ReactNode;

  /**
   * The background color of the scene.
   *
   * @default #000000
   */
  backgroundColor?: ColorRepresentation;

  /**
   * The Fog properties
   *
   * @default {
   *   color: "#000000",
   *   near: 10,
   *   far: 400
   * }
   */
  fog?: FogProps;

  /**
   * The OrbitControls properties.
   *
   * @default {
   *   enableDamping: true,
   *   enableZoom: true,
   *   dampingFactor: 0.01,
   *   autoRotate: true,
   *   autoRotateSpeed: -1
   * }
   */
  orbitControls?: OrbitControlsProps;

  /**
   * Whether to disable the controls.
   *
   * @default false
   */
  disableControls?: boolean;

  /**
   * Whether to disable the fog.
   *
   * @default false
   */
  disableFog?: boolean;

  /**
   * Whether to disable the environment.
   *
   * @default false
   */
  disableEnvironment?: boolean;

  /**
   * The Environment properties.
   *
   * @default {
   *   preset: "sunset"
   * }
   */
  environment?: EnvironmentProps;

  /**
   * The Ground properties.
   *
   * @default {
   *   position: [0, -25, 0]
   * }
   */
  ground?: GroundProps;

  /**
   * Whether to disable the ground.
   *
   * @default false
   */
  disableGround?: boolean;

  /**
   * The fallback to render while loading the scene.
   */
  suspenseFallback?: ReactNode;
};
