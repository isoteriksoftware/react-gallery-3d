import { createContext } from "react";
import { GALLERY_ITEM_NO_PROVIDER_FLAG, GalleryItemState } from "./GalleryItem.types";

/**
 * This context is used to provide the gallery item state to the gallery item components.
 */
export const GalleryItemContext = createContext<
  GalleryItemState | typeof GALLERY_ITEM_NO_PROVIDER_FLAG
>(GALLERY_ITEM_NO_PROVIDER_FLAG);
