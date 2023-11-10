import { Material, BufferGeometry } from "three";
import { HollowCylinderProps } from "../components";
import { ReactNode } from "react";
import { ViewRendererProps } from "./types";

interface GalleryItem {
  generateMaterial: (
    geometry: BufferGeometry,
    cylinderProps: HollowCylinderProps,
  ) => Material | Material[];

  renderView: (viewRendererProps: ViewRendererProps) => ReactNode;
}

export default GalleryItem;
