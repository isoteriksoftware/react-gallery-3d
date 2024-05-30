import { GroupProps } from "@react-three/fiber";
import { GroundProps } from "../Ground";
import { ReactElement } from "react";
import { GalleryItem, GalleryItemProps } from "../GalleryItem";
import { SolidColorItem, SolidColorItemProps } from "../SolidColorItem";
import { ImageItem, ImageItemProps } from "../ImageItem";
import { VideoItem, VideoItemProps } from "../VideoItem";
import { TransparentItem, TransparentItemProps } from "../TransparentItem";

export const GALLERY_NO_PROVIDER_FLAG = Symbol("GALLERY_NO_PROVIDER");

export interface GalleryState {
  itemCount: number;
  item: {
    width: number;
    height: number;
    radialSegments: number;
    heightSegments: number;
    innerRadiusPercent: number;
    sectionAngle: number;
    outerRadius: number;
    innerRadius: number;
    itemIndex?: number;
  };
}

export const AllowedGalleryItemTypes = [
  GalleryItem,
  SolidColorItem,
  ImageItem,
  VideoItem,
  TransparentItem,
];

export type GalleryItemType =
  | ReactElement<GalleryItemProps, typeof GalleryItem>
  | ReactElement<SolidColorItemProps, typeof SolidColorItem>
  | ReactElement<ImageItemProps, typeof ImageItem>
  | ReactElement<VideoItemProps, typeof VideoItem>
  | ReactElement<TransparentItemProps, typeof TransparentItem>;

export type GalleryChildren = [
  GalleryItemType,
  GalleryItemType,
  GalleryItemType,
  ...GalleryItemType[],
];

export interface GalleryProps extends Omit<GroupProps, "children" | "ref"> {
  children: GalleryChildren;
  ground?: GroundProps;
  disableGround?: boolean;
  item?: {
    width?: number;
    height?: number;
    radialSegments?: number;
    heightSegments?: number;
    innerRadiusPercent?: number;
  };
}
