import React, { useMemo } from "react";
import GalleryContext from "./GalleryContext";
import GalleryItemContext from "../GalleryItem/GalleryItemContext";
import { AllowedGalleryItemTypes, GalleryProps } from "./Gallery.types";
import { Group } from "three";

/**
 * The Gallery component.
 * This component is a wrapper around the group component, and it renders the gallery items.
 *
 * @param children The children to render.
 * @param item The gallery item properties.
 */
export const Gallery = React.forwardRef<Group, GalleryProps>(({ children, item, ...rest }, ref) => {
  if (children.length < 3) {
    throw new Error("At least 3 Gallery Items are required");
  }

  const {
    width = 120,
    height = 50,
    radialSegments = 50,
    heightSegments = 1,
    innerRadiusPercent = 0.01,
  } = item || {};

  /**
   * Gets the children that are allowed to be rendered.
   */
  const validChildren = useMemo(() => {
    return children.filter((child) => {
      if (!AllowedGalleryItemTypes.includes(child.type)) {
        if (Array.isArray(child)) {
          return child.every((subChild) => {
            return AllowedGalleryItemTypes.includes(subChild.type);
          });
        }
      }

      return true;
    });
  }, [children]);

  /**
   * Calculates the section angle, outer radius, and inner radius.
   */
  const { sectionAngle, outerRadius, innerRadius } = useMemo(() => {
    const sides = validChildren.length;
    const sectionAngle = (2 * Math.PI) / sides;
    const outerRadius = width / 2;
    const innerRadius = outerRadius - outerRadius * innerRadiusPercent;

    return {
      sectionAngle,
      outerRadius,
      innerRadius,
    };
  }, [validChildren.length, width, innerRadiusPercent]);

  return (
    <GalleryContext.Provider
      value={{
        itemCount: validChildren.length,
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
      <group ref={ref} {...rest}>
        {validChildren.map((child, index) => {
          return (
            <GalleryItemContext.Provider
              key={index}
              value={{
                itemIndex: index,
              }}
            >
              {child}
            </GalleryItemContext.Provider>
          );
        })}
      </group>
    </GalleryContext.Provider>
  );
});
