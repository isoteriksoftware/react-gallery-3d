import { DoubleSide, Material, MeshStandardMaterial, VideoTexture } from "three";
import GalleryItemMaterial from "./GalleryItemMaterial";

class VideoItemMaterial implements GalleryItemMaterial {
  protected readonly source: string;
  protected texture: VideoTexture | undefined;
  protected video: HTMLVideoElement | undefined;
  protected autoplay: boolean = true;

  constructor(source: string, autoplay: boolean = true) {
    this.source = source;
    this.autoplay = autoplay;
  }

  protected initVideo(): void {
    if (!this.video) {
      this.video = document.createElement("video");
    }

    if (!this.texture) {
      this.texture = new VideoTexture(this.video);
    }

    this.video.src = this.source;
    this.video.loop = true;
    this.video.muted = true;
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

  setAutoplay(autoplay: boolean): void {
    this.autoplay = autoplay;
  }

  getAutoplay(): boolean {
    return this.autoplay;
  }
}

export default VideoItemMaterial;
