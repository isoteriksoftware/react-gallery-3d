import { createContext } from "react";
import { GalleryState, GALLERY_NO_PROVIDER_FLAG } from "./Gallery.types";

const GalleryContext = createContext<GalleryState | typeof GALLERY_NO_PROVIDER_FLAG>(
  GALLERY_NO_PROVIDER_FLAG,
);

export default GalleryContext;
