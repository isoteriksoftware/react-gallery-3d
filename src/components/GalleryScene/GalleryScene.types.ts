import { CanvasProps } from "@react-three/fiber";
import { CarouselProps } from "../Gallery";
import { ReactNode } from "react";
import { OrbitControlsProps } from "@react-three/drei";

export type CarouselSceneProps = Omit<CanvasProps, "children"> & {
  backgroundColor?: string;
  fogColor?: string;
  gallery: CarouselProps;
  orbitControls?: OrbitControlsProps;
  children?: ReactNode;
  disableControls?: boolean;
};
