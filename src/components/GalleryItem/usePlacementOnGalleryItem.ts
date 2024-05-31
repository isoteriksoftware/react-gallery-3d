import { useGallery } from "../Gallery";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { calculatePlacementOnGalleryItem, ObjectAlignment } from "../../core";

/**
 * Calculates the position and orientation vectors for an object to be placed on a gallery item (cylinder segment).
 * The object will be placed on the surface of the item, with the object's center at the specified offset distance from the surface.
 *
 * @param objectOffset - The offset distance from the item's surface to the object's center.
 * @param itemAlignmentOffset - An optional angular offset to adjust the alignment
 * @returns {ObjectAlignment} The position and orientation vectors for the object.
 */
export const usePlacementOnGalleryItem = (
  objectOffset: number = 0,
  itemAlignmentOffset?: number,
): ObjectAlignment => {
  const { item, itemCount } = useGallery();
  const { sectionAngle, outerRadius, itemIndex } = item;

  if (!itemIndex && itemIndex != 0) {
    throw new Error("usePlacementOnGalleryItem can only be used within a GalleryItem.");
  }

  const [position] = useState(new Vector3());
  const [orientation] = useState(new Vector3());

  useEffect(() => {
    calculatePlacementOnGalleryItem(
      itemIndex,
      outerRadius,
      sectionAngle,
      itemCount,
      itemAlignmentOffset,
      objectOffset,
      position,
      orientation,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionAngle, outerRadius, itemIndex, objectOffset, itemAlignmentOffset, itemCount]);

  return { position, orientation };
};
