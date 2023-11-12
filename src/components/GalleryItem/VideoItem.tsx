import React, { useLayoutEffect, useMemo } from "react";
import { GalleryItemRefData, VideoItemProps } from "./GalleryItem.types";
import { VideoItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";

const VideoItem = React.forwardRef<GalleryItemRefData, VideoItemProps>(
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
      <GalleryItem itemMaterial={material} ref={ref}>
        {children}
      </GalleryItem>
    );
  },
);

export default VideoItem;
