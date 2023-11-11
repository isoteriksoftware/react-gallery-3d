import { CanvasProps } from "@react-three/fiber";
import { Gallery } from "../Gallery";
import { ReactElement, ReactNode } from "react";
import { EnvironmentProps, OrbitControlsProps } from "@react-three/drei";

export type GallerySceneChildren =
  | ReactElement<typeof Gallery>
  | [ReactElement<typeof Gallery>, ...ReactNode[]];

export type GallerySceneProps = Omit<CanvasProps, "children"> & {
  children: GallerySceneChildren;
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
};
