import GalleryItem from "./GalleryItem";
import { DoubleSide, Material, MeshStandardMaterial, VideoTexture } from "three";

class VideoItem implements GalleryItem {
  protected readonly source: string;
  protected texture: VideoTexture | undefined;
  protected video: HTMLVideoElement | undefined;
  protected autoplay: boolean = true;

  constructor(source: string, autoplay: boolean = true) {
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
