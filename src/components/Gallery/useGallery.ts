import { useContext } from "react";
import { GalleryContext } from "./GalleryContext";
import { GALLERY_NO_PROVIDER_FLAG, GalleryState } from "./Gallery.types";
import { GalleryItemContext } from "../GalleryItem/GalleryItemContext";
import { GALLERY_ITEM_NO_PROVIDER_FLAG } from "../GalleryItem";

/**
 * A hook to get the gallery data.
 * This hook must be called within a Gallery component.
 *
 * @returns {GalleryState} The gallery state data.
 */
export const useGallery = (): GalleryState => {
  const data = useContext(GalleryContext);

  if (data === GALLERY_NO_PROVIDER_FLAG) {
    throw new Error("useGallery must be called within a Gallery");
  }

  const itemData = useContext(GalleryItemContext);
  if (itemData !== GALLERY_ITEM_NO_PROVIDER_FLAG) {
    data.item.itemIndex = itemData.itemIndex;
  }

  return data;
};
