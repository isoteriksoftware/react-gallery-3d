import { GalleryItemProps } from "../GalleryItem";
import { ColorRepresentation } from "three";

/**
 * The SolidColorItem component properties.
 */
export type SolidColorItemProps = Omit<GalleryItemProps, "material"> & {
  /**
   * The color of the solid color item.
   */
  color: ColorRepresentation;
};
