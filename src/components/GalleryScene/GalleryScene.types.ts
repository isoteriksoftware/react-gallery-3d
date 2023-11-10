import { CanvasProps } from "@react-three/fiber";
import { Gallery } from "../Gallery";
import { ReactElement, ReactNode } from "react";
import { OrbitControlsProps } from "@react-three/drei";

export type GallerySceneChildren = [ReactElement<typeof Gallery>, ...ReactNode[]];

export type GallerySceneProps = Omit<CanvasProps, "children"> & {
  children: GallerySceneChildren;
  backgroundColor?: string;
  fogColor?: string;
  orbitControls?: OrbitControlsProps;
  disableControls?: boolean;
  disableFog?: boolean;
  disableEnvironment?: boolean;
};
