import { GalleryItemMaterial } from "../../core";
import { PropsWithChildren } from "react";
import { Material, Mesh } from "three";

export const GALLERY_ITEM_NO_PROVIDER_FLAG = Symbol("GALLERY_ITEM_NO_PROVIDER");

export interface GalleryItemState {
  itemIndex: number;
}

export interface GalleryItemInitData {
  itemMaterial: GalleryItemMaterial;
  mesh: Mesh;
  material: Material | Material[];
}

export type GalleryItemProps = PropsWithChildren<{
  itemMaterial: GalleryItemMaterial;
  onInit?: (data: GalleryItemInitData) => void;
}>;
