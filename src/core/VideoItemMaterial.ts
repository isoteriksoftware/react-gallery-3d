import { DoubleSide, Material, MeshStandardMaterial, VideoTexture } from "three";
import GalleryItemMaterial from "./GalleryItemMaterial";

class VideoItemMaterial implements GalleryItemMaterial {
  protected readonly source: string;
  protected texture: VideoTexture | undefined;
  protected video: HTMLVideoElement | undefined;
  protected crossOrigin: string | undefined;

  constructor(source: string, crossOrigin?: string) {
    this.source = source;
    this.crossOrigin = crossOrigin;
  }

  protected initVideo(): void {
    if (!this.video) {
      this.video = document.createElement("video");
    }

    if (!this.texture) {
      this.texture = new VideoTexture(this.video);
    }

    this.video.src = this.source;
    if (this.crossOrigin) {
      this.video.crossOrigin = this.crossOrigin;
    }

    this.video.load();
  }

  generate(): Material | Material[] {
    this.initVideo();

    return new MeshStandardMaterial({
      toneMapped: true,
      map: this.texture,
      side: DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
  }

  getVideo(): HTMLVideoElement | undefined {
    return this.video;
  }
}

export default VideoItemMaterial;
