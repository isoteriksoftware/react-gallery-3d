import { Texture } from "three";
import { GalleryItemProps } from "../GalleryItem";

export type ImageItemProps = Omit<GalleryItemProps, "itemMaterial"> & {
  src?: string;
  texture?: Texture;
};
