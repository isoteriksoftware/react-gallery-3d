import { GroupProps } from "@react-three/fiber";
import { GroundProps } from "../Ground";
import { ReactElement } from "react";
import { GalleryItemView } from "../GalleryItem";

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

type GalleryItemType = ReactElement<typeof GalleryItemView>;
export type GalleryChildren =
  | [GalleryItemType, GalleryItemType, GalleryItemType]
  | [GalleryItemType, GalleryItemType, GalleryItemType, ...GalleryItemType[]];

export interface GalleryProps extends GroupProps {
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
