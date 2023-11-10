import { Material, BufferGeometry } from "three";
import { HollowCylinderProps } from "../components";
import { ReactNode } from "react";
import { ViewRendererParams } from "./types";

interface GalleryItem {
  generateMaterial: (
    geometry: BufferGeometry,
    cylinderProps: HollowCylinderProps,
  ) => Material | Material[];

  renderView: (viewRendererParams: ViewRendererParams) => ReactNode;
}

export default GalleryItem;
