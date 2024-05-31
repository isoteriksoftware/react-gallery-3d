import { CanvasProps } from "@react-three/fiber";
import { ReactNode } from "react";
import { EnvironmentProps, OrbitControlsProps } from "@react-three/drei";
import { GroundProps } from "../Ground";

export type GallerySceneProps = Omit<CanvasProps, "children"> & {
  children?: ReactNode;
  backgroundColor?: string;
  fog?: {
    color?: string;
    near?: number;
    far?: number;
  };
  orbitControls?: OrbitControlsProps;
  disableControls?: boolean;
  disableFog?: boolean;
  disableEnvironment?: boolean;
  environment?: EnvironmentProps;
  ground?: GroundProps;
  disableGround?: boolean;
};
