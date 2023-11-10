import React, { useMemo } from "react";
import GalleryContext from "./GalleryContext";
import GalleryItemContext from "../GalleryItem/GalleryItemContext";
import { GalleryProps } from "./Gallery.types";
import { Ground } from "../Ground";

const Gallery: React.FC<GalleryProps> = ({ children, item, ground, disableGround, ...rest }) => {
  if (children.length < 3) {
    throw new Error("At least 3 items are required");
  }

  const {
    width = 120,
    height = 50,
    radialSegments = 50,
    heightSegments = 1,
    innerRadiusPercent = 0.99,
  } = item || {};

  const { sectionAngle, outerRadius, innerRadius } = useMemo(() => {
    const sides = children.length;
    const sectionAngle = (2 * Math.PI) / sides;
    const outerRadius = width / 2;
    const innerRadius = outerRadius * innerRadiusPercent;

    return {
      sectionAngle,
      outerRadius,
      innerRadius,
    };
  }, [children]);

  return (
    <GalleryContext.Provider
      value={{
        itemCount: children.length,
        item: {
          width,
          height,
          radialSegments,
          heightSegments,
          innerRadiusPercent,
          innerRadius,
          outerRadius,
          sectionAngle,
        },
      }}
    >
      <group position={[0, 0, 0]} {...rest}>
        {children.map((child, index) => (
          <GalleryItemContext.Provider key={index} value={index}>
            {child}
          </GalleryItemContext.Provider>
        ))}
      </group>

      {!disableGround && <Ground position={[0, -height / 2, 0]} {...ground} />}
    </GalleryContext.Provider>
  );
};

export default Gallery;
