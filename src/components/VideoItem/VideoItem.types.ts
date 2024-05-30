import { GalleryItemProps } from "../GalleryItem";
import { VideoTexture } from "three";

export type VideoItemProps = Omit<GalleryItemProps, "material"> & {
  src: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  crossOrigin?: JSX.IntrinsicElements["video"]["crossOrigin"];
  onInit?: (video: HTMLVideoElement, texture: VideoTexture) => void;
};
