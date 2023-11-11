import GalleryItemMaterial from "../../core/GalleryItemMaterial";
import { PropsWithChildren } from "react";
import { Color, Texture } from "three";

export const GALLERY_ITEM_NO_PROVIDER_FLAG = Symbol("GALLERY_ITEM_NO_PROVIDER");

export interface GalleryItemState {
  itemIndex: number;
}

export type GalleryItemProps = PropsWithChildren<{
  material: GalleryItemMaterial;
}>;

export type SolidColorItemProps = PropsWithChildren<{
  color: string | Color;
}>;

export type ImageItemProps = PropsWithChildren<{
  src?: string;
  texture?: Texture;
}>;

export type VideoItemProps = PropsWithChildren<{
  src: string;
  autoplay?: boolean;
}>;
