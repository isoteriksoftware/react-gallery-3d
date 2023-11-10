import { useContext } from "react";
import GalleryContext from "./GalleryContext";
import { GALLERY_NO_PROVIDER_FLAG } from "./Gallery.types";

const useGallery = () => {
  const data = useContext(GalleryContext);

  if (data === GALLERY_NO_PROVIDER_FLAG) {
    throw new Error("useGallery must be called within a Gallery");
  }

  return data;
};

export default useGallery;
