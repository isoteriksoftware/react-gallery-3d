import { GalleryItemProps } from "../GalleryItem";
import { ColorRepresentation } from "three";

export type SolidColorItemProps = Omit<GalleryItemProps, "material"> & {
  color: ColorRepresentation;
};
