import useGallery from "../Gallery/useGallery";
import { useEffect, useMemo } from "react";
import { Vector3 } from "three";
import { calculatePlacementOnGalleryItem } from "react-gallery-3d";

const usePlacementOnGalleryItem = () => {
  const { sectionAngle, outerRadius, itemIndex } = useGallery().item;
  if (!itemIndex && itemIndex != 0) {
    throw new Error("usePlacementOnGalleryItem can only be used within a GalleryItem.");
  }

  const position = useMemo(() => new Vector3(), []);
  const orientation = useMemo(() => new Vector3(), []);

  useEffect(() => {
    calculatePlacementOnGalleryItem(itemIndex, outerRadius, sectionAngle, position, orientation);
  }, [sectionAngle, outerRadius, itemIndex, position, orientation]);

  return { position, orientation };
};

export default usePlacementOnGalleryItem;
