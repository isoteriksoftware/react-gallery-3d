import { MeshStandardMaterial, Color, Material } from "three";
import GalleryItemMaterial from "./GalleryItemMaterial";

class SolidColorItemMaterial implements GalleryItemMaterial {
  protected readonly color: Color | string;
  protected readonly finalColor: Color;

  constructor(color: Color | string) {
    this.color = color;

    if (typeof color === "string") {
      this.finalColor = new Color(color);
    } else {
      this.finalColor = color;
    }
  }

  generate(): Material {
    return new MeshStandardMaterial({
      color: this.finalColor,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
  }
}

export default SolidColorItemMaterial;
