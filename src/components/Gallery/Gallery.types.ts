import GalleryItem from "../../core/GalleryItem";
import { GroupProps } from "@react-three/fiber";
import { HollowCylinderProps } from "../HollowCylinder";
import { GroundProps } from "../Ground";

type MinThreeItemsArray<T> = [T, T, T, ...T[]];
export type GalleryItems = MinThreeItemsArray<GalleryItem>;
export type GalleryItemProps = Omit<HollowCylinderProps, "items">;

export interface GalleryProps extends GroupProps {
  items: GalleryItems;
  item?: GalleryItemProps;
  ground?: GroundProps;
  disableGround?: boolean;
}
