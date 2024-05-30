import { Color } from "three";
import { GalleryItemProps } from "../GalleryItem";

export type SolidColorItemProps = Omit<GalleryItemProps, "itemMaterial"> & {
  color: string | Color;
};
