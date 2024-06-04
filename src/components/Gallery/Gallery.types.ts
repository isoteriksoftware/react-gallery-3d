import { GroupProps } from "@react-three/fiber";
import { ReactElement } from "react";
import { GalleryItem, GalleryItemProps } from "../GalleryItem";
import { SolidColorItem, SolidColorItemProps } from "../SolidColorItem";
import { ImageItem, ImageItemProps } from "../ImageItem";
import { VideoItem, VideoItemProps } from "../VideoItem";
import { TransparentItem, TransparentItemProps } from "../TransparentItem";
import { ObjectItem, ObjectItemProps } from "../ObjectItem";

/**
 * A flag to indicate that no provider was found.
 */
export const GALLERY_NO_PROVIDER_FLAG = Symbol("GALLERY_NO_PROVIDER");

/**
 * The gallery state.
 * This state is used to store the gallery item count and the gallery item properties.
 */
export type GalleryState = {
  /**
   * The total number of items in the gallery.
   */
  itemCount: number;

  /**
   * The gallery items ids.
   */
  itemsId: string[];

  /**
   * Registers a gallery item.
   * This function is called by the gallery item component to register itself.
   *
   * @param id The id of the gallery item.
   */
  registerItem: (id: string) => void;

  /**
   * Unregisters a gallery item.
   * This function is called by the gallery item component to unregister itself.
   *
   * @param id The id of the gallery item.
   */
  unregisterItem: (id: string) => void;

  /**
   * The gallery item properties.
   */
  item: {
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
    itemIndex?: number;
  };
};

/**
 * The useGallery hook return type.
 */
export type UseGalleryReturnType = Omit<
  GalleryState,
  "itemsId" | "registerItem" | "unregisterItem"
>;

/**
 * The valid gallery item types.
 * These are the types that can be used as children of the Gallery component.
 * Any other type will be ignored.
 */
export const AllowedGalleryItemTypes = [
  GalleryItem,
  SolidColorItem,
  ImageItem,
  VideoItem,
  TransparentItem,
  ObjectItem,
];

/**
 * The gallery item type.
 */
export type GalleryItemType =
  | ReactElement<GalleryItemProps, typeof GalleryItem>
  | ReactElement<SolidColorItemProps, typeof SolidColorItem>
  | ReactElement<ImageItemProps, typeof ImageItem>
  | ReactElement<VideoItemProps, typeof VideoItem>
  | ReactElement<TransparentItemProps, typeof TransparentItem>
  | ReactElement<ObjectItemProps, typeof ObjectItem>;

/**
 * The gallery children type.
 * This is the type of the children of the Gallery component.
 * At least 3 gallery items are required.
 */
export type GalleryChildren =
  | [GalleryItemType, GalleryItemType, GalleryItemType, ...GalleryItemType[]]
  | GalleryItemType[];

/**
 * The Gallery component properties.
 */
export type GalleryProps = Omit<GroupProps, "children" | "ref"> & {
  /**
   * The children of the gallery.
   * These are the gallery items.
   */
  children: GalleryChildren;

  /**
   * The gallery item properties.
   */
  item?: {
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
  };
};
