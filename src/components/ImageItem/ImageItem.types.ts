import { Texture } from "three";
import { GalleryItemProps } from "../GalleryItem";

export type ImageItemProps = Omit<GalleryItemProps, "material"> & {
  src?: string;
  texture?: Texture;
};
