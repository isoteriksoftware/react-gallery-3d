import { Texture } from "three";
import { GalleryItemProps, MappableMaterial } from "../GalleryItem";

/**
 * The ImageItem component properties.
 */
export type ImageItemProps = Omit<GalleryItemProps, "material"> & {
  /**
   * The image source.
   * If a texture is provided, this will be ignored.
   */
  src?: string;

  /**
   * The texture to use.
   * If provided, the src will be ignored.
   */
  texture?: Texture;

  /**
   * The material to use.
   * If not provided, a new MeshStandardMaterial will be created.
   */
  material?: MappableMaterial;
};

/**
 * The useImageMaterial hook options.
 */
export type UseImageMaterialOptions = {
  /**
   * The image source.
   * If a texture is provided, this will be ignored.
   */
  src?: string;

  /**
   * The texture to use.
   * If provided, the src will be ignored.
   */
  texture?: Texture;

  /**
   * The wrapped material.
   * If not provided, a new MeshStandardMaterial will be created.
   */
  wrappedMaterial?: MappableMaterial;
};

/**
 * The useImageMaterial hook result.
 */
export type UseImageMaterialResult = {
  /**
   * The texture for the image.
   */
  texture: Texture;

  /**
   * The material for the image.
   */
  material: MappableMaterial;
};
