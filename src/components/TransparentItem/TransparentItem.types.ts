import { GalleryItemProps } from "../GalleryItem";

export type TransparentItemProps = Omit<GalleryItemProps, "itemMaterial"> & {
  opacity?: number;
};
