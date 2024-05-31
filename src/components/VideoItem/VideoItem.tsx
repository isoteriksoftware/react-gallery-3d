import React, { useEffect } from "react";
import { VideoItemProps } from "./VideoItem.types";
import { GalleryItem } from "../GalleryItem";
import { Mesh } from "three";
import { useVideoMaterial } from "./useVideoMaterial";

/**
 * This component renders a video item in the gallery.
 *
 * It uses the useVideoMaterial hook internally to create a video material.
 *
 * @param src The video source.
 * @param children The children to render.
 * @param autoplay Whether to autoplay the video.
 * @param muted Whether to mute the video.
 * @param loop Whether to loop the video.
 * @param crossOrigin The cross-origin attribute for the video.
 * @param material The material to use for the video.
 * @param onInit The callback to call when the video is initialized.
 */
export const VideoItem = React.forwardRef<Mesh, VideoItemProps>(
  (
    {
      src,
      children,
      material: materialOverride,
      autoplay = true,
      muted = true,
      loop = true,
      crossOrigin,
      onInit,
      ...rest
    },
    ref,
  ) => {
    const { material, video, texture } = useVideoMaterial({
      src,
      autoplay,
      muted,
      loop,
      crossOrigin,
      wrappedMaterial: materialOverride,
    });

    useEffect(() => {
      if (onInit) {
        onInit(video, texture);
      }
    }, [onInit, texture, video]);

    return (
      <GalleryItem ref={ref} material={material} {...rest}>
        {children}
      </GalleryItem>
    );
  },
);
