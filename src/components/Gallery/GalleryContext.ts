import { createContext } from "react";
import { GalleryState, GALLERY_NO_PROVIDER_FLAG } from "./Gallery.types";

/**
 * This context is used to provide the gallery state to the gallery components.
 */
export const GalleryContext = createContext<GalleryState | typeof GALLERY_NO_PROVIDER_FLAG>(
  GALLERY_NO_PROVIDER_FLAG,
);
