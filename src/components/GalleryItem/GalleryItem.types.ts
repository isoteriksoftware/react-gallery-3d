import GalleryItemMaterial from "../../core/GalleryItemMaterial";
import { PropsWithChildren } from "react";
import { Color, Material, Mesh, Texture } from "three";

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

export type SolidColorItemProps = Omit<GalleryItemProps, "itemMaterial"> & {
  color: string | Color;
};

export type ImageItemProps = Omit<GalleryItemProps, "itemMaterial"> & {
  src?: string;
  texture?: Texture;
};

export type VideoItemProps = Omit<GalleryItemProps, "itemMaterial"> & {
  src: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  crossOrigin?: "anonymous" | "use-credentials" | "" | null;
};
