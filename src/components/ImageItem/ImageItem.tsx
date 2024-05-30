import React from "react";
import { ImageItemProps } from "./ImageItem.types";
import { GalleryItem } from "../GalleryItem";
import { Mesh } from "three";
import { useImageMaterial } from "./useImageMaterial";

export const ImageItem = React.forwardRef<Mesh, ImageItemProps>(
  ({ src, texture, children, ...rest }, ref) => {
    const { material } = useImageMaterial({
      src,
      texture,
    });

    return (
      <GalleryItem ref={ref} material={material} {...rest}>
        {children}
      </GalleryItem>
    );
  },
);
