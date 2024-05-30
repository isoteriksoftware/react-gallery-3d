import { PropsWithChildren } from "react";
import {
  Material,
  MeshBasicMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
} from "three";

export const GALLERY_ITEM_NO_PROVIDER_FLAG = Symbol("GALLERY_ITEM_NO_PROVIDER");

export interface GalleryItemState {
  itemIndex: number;
}

export type GalleryItemProps = PropsWithChildren<{
  material: Material | Material[];
}>;

export type MappableMaterial =
  | MeshBasicMaterial
  | MeshStandardMaterial
  | MeshPhongMaterial
  | MeshPhysicalMaterial;
