import { Material, MeshBasicMaterial } from "three";
import { GalleryItemMaterial } from ".";

export class TransparentItemMaterial implements GalleryItemMaterial {
  constructor(private opacity: number = 0) {}

  generate(): Material {
    return new MeshBasicMaterial({
      color: 0xffffff,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      transparent: true,
      opacity: this.opacity,
    });
  }

  set currentOpacity(value: number) {
    this.opacity = value;
  }
}
