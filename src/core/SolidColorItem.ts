import { MeshStandardMaterial, Color, Material } from "three";
import GalleryItem from "./GalleryItem";

class SolidColorItem implements GalleryItem {
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

  generateMaterial(): Material | Material[] {
    return new MeshStandardMaterial({ color: this.finalColor });
  }
}

export default SolidColorItem;
