import { MeshStandardMaterial, Color, Material } from "three";
import BaseGalleryItem from "./BaseGalleryItem";
import { ViewRenderer } from "./types";

class SolidColorItem extends BaseGalleryItem {
  protected readonly color: Color | string;
  protected readonly finalColor: Color;

  constructor(color: Color | string, viewRenderer?: ViewRenderer) {
    super(viewRenderer);
    this.color = color;

    if (typeof color === "string") {
      this.finalColor = new Color(color);
    } else {
      this.finalColor = color;
    }
  }

  generateMaterial(): Material | Material[] {
    return new MeshStandardMaterial({
      color: this.finalColor,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
  }
}

export default SolidColorItem;
