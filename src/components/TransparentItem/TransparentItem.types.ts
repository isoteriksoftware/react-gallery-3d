import { GalleryItemProps } from "../GalleryItem";

/**
 * The TransparentItem component properties.
 */
export type TransparentItemProps = Omit<GalleryItemProps, "material"> & {
  /**
   * The opacity of the item.
   *
   * @default 0
   */
  opacity?: number;
};
