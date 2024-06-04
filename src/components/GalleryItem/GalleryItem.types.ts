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
import { MeshProps } from "@react-three/fiber";

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
export type GalleryItemProps = MeshProps & {
  /**
   * The material to apply to the gallery item.
   */
  material: Material | Material[];

  /**
   * The width of the gallery item.
   *
   * @default 120
   */
  width?: number;

  /**
   * The height of the gallery item.
   *
   * @default 50
   */
  height?: number;

  /**
   * The number of radial segments.
   *
   * @default 50
   */
  radialSegments?: number;

  /**
   * The number of height segments.
   *
   * @default 1
   */
  heightSegments?: number;

  /**
   * The percentage of the outer radius to use as the inner radius.
   *
   * @default 0.01
   */
  innerRadiusPercent?: number;

  /**
   * The section angle of the gallery item.
   *
   * This property is calculated using the total number of items in the gallery when not provided.
   */
  sectionAngle?: number;
};

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
