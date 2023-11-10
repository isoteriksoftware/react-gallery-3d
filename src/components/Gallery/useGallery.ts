import { useContext } from "react";
import GalleryContext from "./GalleryContext";
import { GALLERY_NO_PROVIDER_FLAG } from "./Gallery.types";
import GalleryItemContext from "../GalleryItem/GalleryItemContext";
import { GALLERY_ITEM_NO_PROVIDER_FLAG } from "../GalleryItem/GalleryItem.types";

const useGallery = () => {
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

export default useGallery;
