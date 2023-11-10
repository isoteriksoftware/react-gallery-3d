import { Material } from "three";

interface GalleryItemMaterial {
  generate: () => Material | Material[];
}

export default GalleryItemMaterial;
