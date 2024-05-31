import React from "react";
import { ImageItemProps } from "./ImageItem.types";
import { GalleryItem } from "../GalleryItem";
import { Mesh } from "three";
import { useImageMaterial } from "./useImageMaterial";

/**
 * The ImageItem component.
 * This component is a wrapper around the GalleryItem component, and it renders an image.
 * Either the src or the texture prop must be provided.
 *
 * @param src The image source.
 * @param texture The texture to use.
 * @param material The material to use.
 */
export const ImageItem = React.forwardRef<Mesh, ImageItemProps>(
  ({ src, texture, material: materialOverride, children, ...rest }, ref) => {
    /**
     * Configures the material for the image.
     */
    const { material } = useImageMaterial({
      src,
      texture,
      wrappedMaterial: materialOverride,
    });

    return (
      <GalleryItem ref={ref} material={material} {...rest}>
        {children}
      </GalleryItem>
    );
  },
);
