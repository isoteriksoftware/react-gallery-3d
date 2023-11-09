import GalleryItem from "./GalleryItem";
import { Texture, MeshStandardMaterial, Material, DoubleSide, TextureLoader } from "three";

class ImageItem implements GalleryItem {
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

  generateMaterial(): Material | Material[] {
    this.initTexture();

    return new MeshStandardMaterial({
      toneMapped: true,
      map: this.texture,
      side: DoubleSide,
    });
  }
}

export default ImageItem;
