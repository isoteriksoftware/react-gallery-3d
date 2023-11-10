import { CanvasProps } from "@react-three/fiber";
import { GalleryProps } from "../Gallery";
import { ReactNode } from "react";
import { OrbitControlsProps } from "@react-three/drei";

export type GallerySceneProps = Omit<CanvasProps, "children"> & {
  backgroundColor?: string;
  fogColor?: string;
  gallery: GalleryProps;
  orbitControls?: OrbitControlsProps;
  children?: ReactNode;
  disableControls?: boolean;
  disableFog?: boolean;
  disableEnvironment?: boolean;
};
