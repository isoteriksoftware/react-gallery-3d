import { useContext } from "react";
import { GalleryContext } from "./GalleryContext";
import { GALLERY_NO_PROVIDER_FLAG, UseGalleryReturnType } from "./Gallery.types";
import { GalleryItemContext } from "../GalleryItem/GalleryItemContext";
import { GALLERY_ITEM_NO_PROVIDER_FLAG } from "../GalleryItem";

/**
 * A hook to get the gallery data.
 * This hook must be called within a Gallery component.
 *
 * @returns {UseGalleryReturnType} The gallery state data.
 */
export const useGallery = (): UseGalleryReturnType => {
  const galleryState = useContext(GalleryContext);

  if (galleryState === GALLERY_NO_PROVIDER_FLAG) {
    throw new Error("useGallery must be called within a Gallery");
  }

  const galleryItemState = useContext(GalleryItemContext);
  if (galleryItemState !== GALLERY_ITEM_NO_PROVIDER_FLAG) {
    galleryState.item.itemIndex = galleryItemState.itemIndex;
  }

  const {
    itemCount,
    item: {
      width,
      height,
      radialSegments,
      heightSegments,
      innerRadiusPercent,
      sectionAngle,
      outerRadius,
      innerRadius,
      itemIndex,
    },
  } = galleryState;

  return {
    itemCount,
    item: {
      width,
      height,
      radialSegments,
      heightSegments,
      innerRadiusPercent,
      sectionAngle,
      outerRadius,
      innerRadius,
      itemIndex,
    },
  };
};
