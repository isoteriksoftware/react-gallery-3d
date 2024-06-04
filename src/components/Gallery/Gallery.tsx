import React, { useCallback, useMemo, useState } from "react";
import { GalleryContext } from "./GalleryContext";
import { GalleryProps } from "./Gallery.types";
import { Group } from "three";

/**
 * The Gallery component.
 * This component is a wrapper around the group component, and it renders the gallery items.
 *
 * @param children The children to render.
 * @param item The gallery item properties.
 */
export const Gallery = React.forwardRef<Group, GalleryProps>(({ children, item, ...rest }, ref) => {
  const [itemsId, setItemsId] = useState<string[]>([]);

  const {
    width = 120,
    height = 50,
    radialSegments = 50,
    heightSegments = 1,
    innerRadiusPercent = 0.01,
    sectionAngle: preferredSectionAngle,
  } = item || {};

  const registerItem = useCallback((id: string) => {
    setItemsId((prevItems) => {
      if (prevItems.includes(id)) {
        // eslint-disable-next-line no-console
        console.warn(`GalleryItem id is already registered: "${id}"`);
        return prevItems;
      }

      return [...prevItems, id];
    });
  }, []);

  const unregisterItem = useCallback((id: string) => {
    setItemsId((prevItems) => prevItems.filter((i) => i !== id));
  }, []);

  /**
   * Calculates the section angle, outer radius, and inner radius.
   */
  const { sectionAngle, outerRadius, innerRadius } = useMemo(() => {
    const sectionAngle = preferredSectionAngle || (2 * Math.PI) / itemsId.length;
    const outerRadius = width / 2;
    const innerRadius = outerRadius - outerRadius * innerRadiusPercent;

    return {
      sectionAngle,
      outerRadius,
      innerRadius,
    };
  }, [preferredSectionAngle, itemsId.length, width, innerRadiusPercent]);

  return (
    <GalleryContext.Provider
      value={{
        itemsId,
        registerItem,
        unregisterItem,
        itemCount: itemsId.length,
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
        {children}
      </group>
    </GalleryContext.Provider>
  );
});
