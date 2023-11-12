import GalleryItemMaterial from "../../core/GalleryItemMaterial";
import { PropsWithChildren } from "react";
import { Color, Material, Mesh, Texture } from "three";

export const GALLERY_ITEM_NO_PROVIDER_FLAG = Symbol("GALLERY_ITEM_NO_PROVIDER");

export interface GalleryItemState {
  itemIndex: number;
}

export type GalleryItemProps = PropsWithChildren<{
  itemMaterial: GalleryItemMaterial;
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
  muted?: boolean;
  loop?: boolean;
  crossOrigin?: "anonymous" | "use-credentials" | "" | null;
}>;

export interface GalleryItemRefData {
  itemMaterial: GalleryItemMaterial;
  mesh: Mesh;
  material: Material | Material[];
}
