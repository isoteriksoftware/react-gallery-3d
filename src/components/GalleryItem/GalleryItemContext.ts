import { createContext } from "react";
import { GALLERY_ITEM_NO_PROVIDER_FLAG, GalleryItemState } from ".";

const GalleryItemContext = createContext<GalleryItemState | typeof GALLERY_ITEM_NO_PROVIDER_FLAG>(
  GALLERY_ITEM_NO_PROVIDER_FLAG,
);

export default GalleryItemContext;
