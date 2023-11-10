import { GroupProps } from "@react-three/fiber";
import { GroundProps } from "../Ground";
import { ReactElement } from "react";
import { ImageItem, SolidColorItem, VideoItem } from "../GalleryItem";
import GalleryItem from "../GalleryItem/GalleryItem";
import {
  GalleryItemProps,
  ImageItemProps,
  SolidColorItemProps,
  VideoItemProps,
} from "../GalleryItem/GalleryItem.types";

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
  };
}

export const AllowedGalleryItemTypes = [GalleryItem, SolidColorItem, ImageItem, VideoItem];

export type GalleryItemType =
  | ReactElement<GalleryItemProps, typeof GalleryItem>
  | ReactElement<SolidColorItemProps, typeof SolidColorItem>
  | ReactElement<ImageItemProps, typeof ImageItem>
  | ReactElement<VideoItemProps, typeof VideoItem>;

export type GalleryChildren =
  | [GalleryItemType, GalleryItemType, GalleryItemType]
  | [GalleryItemType, GalleryItemType, GalleryItemType, ...GalleryItemType[]];

export interface GalleryProps extends Omit<GroupProps, "children"> {
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
