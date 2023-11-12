import React, { useLayoutEffect, useMemo } from "react";
import { VideoItemProps } from "./GalleryItem.types";
import { VideoItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";

const VideoItem: React.FC<VideoItemProps> = ({
  src,
  children,
  autoplay = true,
  muted = true,
  loop = true,
  crossOrigin,
  ...rest
}) => {
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
    <GalleryItem itemMaterial={material} {...rest}>
      {children}
    </GalleryItem>
  );
};

export default VideoItem;
