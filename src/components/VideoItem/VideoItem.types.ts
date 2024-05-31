import { GalleryItemProps, MappableMaterial } from "../GalleryItem";
import { VideoTexture } from "three";

/**
 * The useVideoMaterial hook options.
 */
export type UseVideoMaterialOptions = {
  /**
   * The video source.
   */
  src: string;

  /**
   * The wrapped material.
   *
   * If not provided, a new MeshStandardMaterial will be created.
   */
  wrappedMaterial?: MappableMaterial;

  /**
   * Whether to autoplay the video.
   *
   * If this is set to true, the video will be muted.
   *
   * @default true
   */
  autoplay?: boolean;

  /**
   * Whether to mute the video.
   *
   * @default true
   */
  muted?: boolean;

  /**
   * Whether to loop the video.
   *
   * @default true
   */
  loop?: boolean;

  /**
   * The cross-origin attribute for the video.
   */
  crossOrigin?: JSX.IntrinsicElements["video"]["crossOrigin"];
};

/**
 * The useVideoMaterial hook result.
 */
export type UseVideoMaterialResult = {
  /**
   * The video element.
   */
  video: HTMLVideoElement;

  /**
   * The video texture.
   */
  texture: VideoTexture;

  /**
   * The material.
   */
  material: MappableMaterial;
};

/**
 * The VideoItem component properties.
 */
export type VideoItemProps = Omit<GalleryItemProps, "material"> & {
  /**
   * The video source.
   */
  src: string;

  /**
   * Whether to autoplay the video.
   *
   * If this is set to true, the video will be muted.
   *
   * @default true
   */
  autoplay?: boolean;

  /**
   * Whether to mute the video.
   *
   * @default true
   */
  muted?: boolean;

  /**
   * Whether to loop the video.
   *
   * @default true
   */
  loop?: boolean;

  /**
   * The cross-origin attribute for the video.
   */
  crossOrigin?: JSX.IntrinsicElements["video"]["crossOrigin"];

  /**
   * A callback that is called when the video is initialized.
   * This is useful for getting references to the video and texture.
   *
   * @param video the video element
   * @param texture the video texture
   */
  onInit?: (video: HTMLVideoElement, texture: VideoTexture) => void;

  /**
   * The material to use for the video.
   *
   * If not provided, a new MeshStandardMaterial will be created.
   */
  material?: MappableMaterial;
};
