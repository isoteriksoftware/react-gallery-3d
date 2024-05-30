import { Material } from "three";

export interface GalleryItemMaterial {
  generate: () => Material | Material[];
}
