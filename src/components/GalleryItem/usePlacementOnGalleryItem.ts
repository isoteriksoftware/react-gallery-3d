import useGallery from "../Gallery/useGallery";
import { useEffect, useMemo } from "react";
import { Vector3 } from "three";
import { calculatePlacementOnGalleryItem } from "react-gallery-3d";

const usePlacementOnGalleryItem = (objectOffset: number = 0) => {
  const { itemCount, item } = useGallery();
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
      objectOffset,
      position,
      orientation,
    );
  }, [sectionAngle, outerRadius, itemIndex, position, orientation, objectOffset, itemCount]);

  return { position, orientation };
};

export default usePlacementOnGalleryItem;
