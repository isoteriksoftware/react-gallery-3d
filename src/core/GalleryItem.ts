import { Material, BufferGeometry } from "three";
import { HollowCylinderProps } from "../components";

interface GalleryItem {
  generateMaterial: (
    geometry: BufferGeometry,
    cylinderProps: HollowCylinderProps,
  ) => Material | Material[];
}

export default GalleryItem;
