import { Texture, MeshStandardMaterial, Material, DoubleSide, TextureLoader } from "three";
import GalleryItemMaterial from "./GalleryItemMaterial";

class ImageItemMaterial implements GalleryItemMaterial {
  protected readonly url: string | undefined;
  protected texture: Texture | undefined;

  constructor(urlOrTexture: string | Texture) {
    if (typeof urlOrTexture === "string") {
      this.url = urlOrTexture;
    } else {
      this.texture = urlOrTexture;
    }
  }

  protected initTexture(): void {
    if (!this.texture) {
      this.texture = new TextureLoader().load(this.url!);
    }
  }

  generate(): Material | Material[] {
    this.initTexture();

    return new MeshStandardMaterial({
      toneMapped: true,
      map: this.texture,
      side: DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
  }
}

export default ImageItemMaterial;
