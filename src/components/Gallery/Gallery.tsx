import { GalleryProps } from "./Gallery.types";
import React, { useLayoutEffect } from "react";
import { Ground } from "../Ground";
import { HollowCylinder } from "../HollowCylinder";
import { VideoItem } from "../../core";

const Gallery: React.FC<GalleryProps> = ({ items, item, ground, disableGround, ...rest }) => {
  const {
    width = 120,
    height = 50,
    radialSegments = 50,
    heightSegments = 1,
    innerRadiusPercent = 0.99,
  } = item || {};

  useLayoutEffect(() => {
    // Play all videos having autoplay enabled
    items.forEach((item) => {
      if (item instanceof VideoItem && item.getAutoplay()) {
        item.getVideo()?.play();
      }
    });
  }, [items]);

  return (
    <group position={[0, 0, 0]} {...rest}>
      <HollowCylinder
        width={width}
        height={height}
        radialSegments={radialSegments}
        heightSegments={heightSegments}
        innerRadiusPercent={innerRadiusPercent}
        items={items}
      />
      {!disableGround && <Ground position={[0, -height / 2, 0]} {...ground} />}
    </group>
  );
};

export default Gallery;
