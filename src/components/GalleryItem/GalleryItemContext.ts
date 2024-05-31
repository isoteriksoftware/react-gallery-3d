import { createContext } from "react";
import { GALLERY_ITEM_NO_PROVIDER_FLAG, GalleryItemState } from ".";

/**
 * This context is used to provide the gallery item state to the gallery item components.
 */
const GalleryItemContext = createContext<GalleryItemState | typeof GALLERY_ITEM_NO_PROVIDER_FLAG>(
  GALLERY_ITEM_NO_PROVIDER_FLAG,
);

export default GalleryItemContext;
