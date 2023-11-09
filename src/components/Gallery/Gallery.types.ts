import GalleryItem from "../../core/GalleryItem";
import { GroupProps } from "@react-three/fiber";
import { HollowCylinderProps } from "../HollowCylinder";
import { GroundProps } from "../Ground";

type MinThreeItemsArray<T> = [T, T, T, ...T[]];
type CylinderProps = Omit<HollowCylinderProps, "items">;

export interface CarouselProps extends GroupProps {
  items: MinThreeItemsArray<GalleryItem>;
  cylinder?: CylinderProps;
  ground?: GroundProps;
  disableGround?: boolean;
}
