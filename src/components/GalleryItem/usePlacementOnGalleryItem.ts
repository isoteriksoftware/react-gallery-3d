import useGallery from "../Gallery/useGallery";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { calculatePlacementOnGalleryItem } from "react-gallery-3d";

/**
 * Calculates the position and orientation vectors for an object to be placed on a gallery item (cylinder segment).
 * @param objectOffset - The offset distance from the item's surface to the object's center.
 * @param itemAlignmentOffset - An optional angular offset to adjust the alignment
 */
export const usePlacementOnGalleryItem = (
  objectOffset: number = 0,
  itemAlignmentOffset?: number,
) => {
  const { item, itemCount } = useGallery();
  const { sectionAngle, outerRadius, itemIndex } = item;

  if (!itemIndex && itemIndex != 0) {
    throw new Error("usePlacementOnGalleryItem can only be used within a GalleryItem.");
  }

  const [position, setPosition] = useState(new Vector3());
  const [orientation, setOrientation] = useState(new Vector3());

  useEffect(() => {
    const { position: newPosition, orientation: newOrientation } = calculatePlacementOnGalleryItem(
      itemIndex,
      outerRadius,
      sectionAngle,
      itemCount,
      itemAlignmentOffset,
      objectOffset,
    );

    if (!position.equals(newPosition)) {
      setPosition(newPosition);
    }

    if (!orientation.equals(newOrientation)) {
      setOrientation(newOrientation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionAngle, outerRadius, itemIndex, objectOffset, itemAlignmentOffset, itemCount]);

  return { position, orientation };
};
