import { DoubleSide, Material, MeshStandardMaterial, VideoTexture } from "three";
import BaseGalleryItem from "./BaseGalleryItem";
import { ViewRenderer } from "./types";

class VideoItem extends BaseGalleryItem {
  protected readonly source: string;
  protected texture: VideoTexture | undefined;
  protected video: HTMLVideoElement | undefined;
  protected autoplay: boolean = true;

  constructor(source: string, viewRenderer?: ViewRenderer, autoplay: boolean = true) {
    super(viewRenderer);

    this.source = source;
    this.autoplay = autoplay;
  }

  protected initVideo(): void {
    if (!this.texture) {
      this.video = document.createElement("video");
      this.video.src = this.source;
      this.video.loop = true;
      this.video.muted = true;

      this.texture = new VideoTexture(this.video);
    }
  }

  generateMaterial(): Material | Material[] {
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

export default VideoItem;
