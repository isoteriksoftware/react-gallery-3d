import GalleryItemMaterial from "../../core/GalleryItemMaterial";
import { PropsWithChildren } from "react";

export type GalleryItemProps = PropsWithChildren<{
  material: GalleryItemMaterial;
}>;
