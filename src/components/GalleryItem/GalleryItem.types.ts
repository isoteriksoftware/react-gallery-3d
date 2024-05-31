import { PropsWithChildren } from "react";
import {
  Material,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  PointsMaterial,
  SpriteMaterial,
} from "three";

/**
 * A flag to indicate that the gallery item has no provider.
 */
export const GALLERY_ITEM_NO_PROVIDER_FLAG = Symbol("GALLERY_ITEM_NO_PROVIDER");

/**
 * The gallery item state.
 * This state is used to keep track of the current item index.
 */
export interface GalleryItemState {
  itemIndex: number;
}

/**
 * The GalleryItem component properties.
 */
export type GalleryItemProps = PropsWithChildren<{
  /**
   * The material to apply to the gallery item.
   */
  material: Material | Material[];
}>;

/**
 * This type represents materials having a map property.
 */
export type MappableMaterial =
  | MeshBasicMaterial
  | MeshLambertMaterial
  | MeshStandardMaterial
  | MeshPhongMaterial
  | MeshPhysicalMaterial
  | MeshToonMaterial
  | PointsMaterial
  | SpriteMaterial;
