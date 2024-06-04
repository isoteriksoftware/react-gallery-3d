import { GALLERY_ITEM_NO_PROVIDER_FLAG, UseGalleryItemReturnType } from "./GalleryItem.types";
import { useContext } from "react";
import { GalleryContext } from "../Gallery/GalleryContext";
import { GALLERY_NO_PROVIDER_FLAG } from "../Gallery";
import { GalleryItemContext } from "./GalleryItemContext";

export const useGalleryItem = (): UseGalleryItemReturnType => {
  const galleryState = useContext(GalleryContext);

  if (galleryState === GALLERY_NO_PROVIDER_FLAG) {
    throw new Error("useGalleryItem must be called within a Gallery");
  }

  const galleryItemState = useContext(GalleryItemContext);
  if (galleryItemState === GALLERY_ITEM_NO_PROVIDER_FLAG) {
    throw new Error("useGallery must be called within a Gallery");
  }

  const { itemCount } = galleryState;

  return {
    ...galleryItemState,
    itemCount,
  };
};
