import { createContext } from "react";
import { GALLERY_NO_PROVIDER_FLAG, GalleryState } from "react-gallery-3d";

const GalleryContext = createContext<GalleryState | typeof GALLERY_NO_PROVIDER_FLAG>(
  GALLERY_NO_PROVIDER_FLAG,
);

export default GalleryContext;
