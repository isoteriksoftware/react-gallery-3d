import React, { useMemo } from "react";
import { ImageItemProps } from "./ImageItem.types";
import { ImageItemMaterial } from "../../core";
import { GalleryItem } from "../GalleryItem";
import { Mesh } from "three";

export const ImageItem = React.forwardRef<Mesh, ImageItemProps>(
  ({ src, texture, children, ...rest }, ref) => {
    if (!src && !texture) {
      throw new Error("Either src or texture must be provided");
    }

    const material = useMemo(() => {
      return new ImageItemMaterial(texture ?? src!);
    }, [src, texture]);

    return (
      <GalleryItem ref={ref} itemMaterial={material} {...rest}>
        {children}
      </GalleryItem>
    );
  },
);
