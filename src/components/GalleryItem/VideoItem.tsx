import React, { useLayoutEffect, useMemo } from "react";
import { VideoItemProps } from "./GalleryItem.types";
import { VideoItemMaterial, GalleryItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";

const VideoItem = React.forwardRef<GalleryItemMaterial, VideoItemProps>(
  ({ src, children, autoplay = true, muted = true, loop = true, crossOrigin }, ref) => {
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
    }, [material]);

    return (
      <GalleryItem material={material} ref={ref}>
        {children}
      </GalleryItem>
    );
  },
);

export default VideoItem;
