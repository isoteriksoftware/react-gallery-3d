import useGallery from "../Gallery/useGallery";
import { useEffect, useMemo } from "react";
import { Vector3 } from "three";
import { calculatePlacementOnGalleryItem } from "react-gallery-3d";

/**
 * Calculates the position and orientation vectors for an object to be placed on a gallery item (cylinder segment).
 * @param objectOffset - The offset distance from the item's surface to the object's center.
 * @param itemAlignmentOffset - An optional angular offset to adjust the alignment
 */
const usePlacementOnGalleryItem = (objectOffset: number = 0, itemAlignmentOffset?: number) => {
  const { item, itemCount } = useGallery();
  const { sectionAngle, outerRadius, itemIndex } = item;

  if (!itemIndex && itemIndex != 0) {
    throw new Error("usePlacementOnGalleryItem can only be used within a GalleryItem.");
  }

  const position = useMemo(() => new Vector3(), []);
  const orientation = useMemo(() => new Vector3(), []);

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
  }, [
    sectionAngle,
    outerRadius,
    itemIndex,
    position,
    orientation,
    objectOffset,
    itemAlignmentOffset,
    itemCount,
  ]);

  return { position, orientation };
};

export default usePlacementOnGalleryItem;
