import React, { useLayoutEffect, useMemo } from "react";
import { VideoItemProps } from "./GalleryItem.types";
import { VideoItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";

const VideoItem: React.FC<VideoItemProps> = ({ src, children, autoplay = true }) => {
  const material = useMemo(() => {
    return new VideoItemMaterial(src);
  }, [src]);

  useLayoutEffect(() => {
    // Play video if autoplay is enabled
    if (material.getVideo() && autoplay) {
      material.getVideo()?.play();
    }
  }, [material]);

  return <GalleryItem material={material}>{children}</GalleryItem>;
};

export default VideoItem;
