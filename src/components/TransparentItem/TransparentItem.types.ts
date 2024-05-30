import { GalleryItemProps } from "../GalleryItem";

export type TransparentItemProps = Omit<GalleryItemProps, "material"> & {
  opacity?: number;
};
