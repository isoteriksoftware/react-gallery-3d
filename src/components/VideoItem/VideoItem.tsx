import React, { useEffect } from "react";
import { VideoItemProps } from "./VideoItem.types";
import { GalleryItem } from "../GalleryItem";
import { Mesh } from "three";
import { useVideoMaterial } from "./useVideoMaterial";

export const VideoItem = React.forwardRef<Mesh, VideoItemProps>(
  (
    { src, children, autoplay = true, muted = true, loop = true, crossOrigin, onInit, ...rest },
    ref,
  ) => {
    const { material, video, texture } = useVideoMaterial({
      src,
      autoplay,
      muted,
      loop,
      crossOrigin,
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
