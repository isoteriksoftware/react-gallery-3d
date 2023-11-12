import React, { useLayoutEffect, useMemo } from "react";
import { VideoItemProps } from "./GalleryItem.types";
import { VideoItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";
import { Mesh } from "three";

const VideoItem = React.forwardRef<Mesh, VideoItemProps>(
  ({ src, children, autoplay = true, muted = true, loop = true, crossOrigin, ...rest }, ref) => {
    const material = useMemo(() => {
      return new VideoItemMaterial(src, crossOrigin ?? undefined);
    }, [src, crossOrigin]);

    useLayoutEffect(() => {
      if (material.getVideo()) {
        const video = material.getVideo()!;
        video.muted = muted;
        video.loop = loop;

        if (autoplay) {
          // Play video if autoplay is enabled
          video.play();
        }
      }
    }, [autoplay, loop, material, muted]);

    return (
      <GalleryItem ref={ref} itemMaterial={material} {...rest}>
        {children}
      </GalleryItem>
    );
  },
);

export default VideoItem;
