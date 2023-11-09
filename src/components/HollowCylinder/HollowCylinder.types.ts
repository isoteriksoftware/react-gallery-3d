import { GroupProps } from "@react-three/fiber";
import GalleryItem from "../../core/GalleryItem";

export interface HollowCylinderProps extends GroupProps {
  width?: number; // diameter of the outer cylinder
  height?: number; // height of the cylinder
  radialSegments?: number; // radial segments for curvature
  heightSegments?: number; // height segments for curvature
  innerRadiusPercent?: number; // inner radius as a percentage of the outer radius
  items: GalleryItem[]; // carousel items for generating materials for each side
}
