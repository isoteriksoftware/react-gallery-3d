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
 */
export type GalleryItemState = {
  /**
   * The width of the gallery item.
   */
  width: number;

  /**
   * The height of the gallery item.
   */
  height: number;

  /**
   * The number of radial segments.
   */
  radialSegments: number;

  /**
   * The number of height segments.
   */
  heightSegments: number;

  /**
   * The percentage of the outer radius to use as the inner radius.
   */
  innerRadiusPercent: number;

  /**
   * The angle of the section of the gallery item.
   * This is used to calculate the position of the gallery item.
   */
  sectionAngle: number;

  /**
   * The radius of the gallery item.
   */
  outerRadius: number;

  /**
   * The inner radius of the gallery item.
   */
  innerRadius: number;

  /**
   * The index of the gallery item.
   */
  itemIndex: number;
};

/**
 * The GalleryItem component properties.
 */
export type GalleryItemProps = MeshProps & {
  /**
   * The material to apply to the gallery item.
   */
  material: Material | Material[];

  /**
   * Disables the auto-disposal of the material.
   *
   * When set to true, the material will not be disposed of when the component is unmounted.
   */
  disableAutoDispose?: boolean;

  /**
   * The width of the gallery item.
   *
   * When not provided, the value is taken from the Gallery item properties.
   */
  width?: number;

  /**
   * The height of the gallery item.
   *
   * When not provided, the value is taken from the Gallery item properties.
   */
  height?: number;

  /**
   * The number of radial segments.
   *
   * When not provided, the value is taken from the Gallery item properties.
   */
  radialSegments?: number;

  /**
   * The number of height segments.
   *
   * When not provided, the value is taken from the Gallery item properties.
   */
  heightSegments?: number;

  /**
   * The percentage of the outer radius to use as the inner radius.
   *
   * When not provided, the value is taken from the Gallery item properties.
   */
  innerRadiusPercent?: number;

  /**
   * The section angle of the gallery item.
   *
   * When not provided, the value is taken from the Gallery item properties.
   */
  sectionAngle?: number;
};

/**
 * The return type of the useGalleryItem hook.
 */
export type UseGalleryItemReturnType = GalleryItemState & {
  /**
   * The total number of items in the gallery.
   */
  itemCount: number;
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
