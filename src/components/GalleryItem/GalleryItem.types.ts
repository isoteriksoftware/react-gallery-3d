import GalleryItemMaterial from "../../core/GalleryItemMaterial";
import { PropsWithChildren } from "react";
import { Color, Texture } from "three";

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
}>;
