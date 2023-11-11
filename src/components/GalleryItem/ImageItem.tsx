import React, { useMemo } from "react";
import { ImageItemProps } from "./GalleryItem.types";
import { ImageItemMaterial, GalleryItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";

const ImageItem = React.forwardRef<GalleryItemMaterial, ImageItemProps>(
  ({ src, texture, children }, ref) => {
    if (!src && !texture) {
      throw new Error("Either src or texture must be provided");
    }

    const material = useMemo(() => {
      return new ImageItemMaterial(texture ?? src!);
    }, [src, texture]);

    return (
      <GalleryItem material={material} ref={ref}>
        {children}
      </GalleryItem>
    );
  },
);

export default ImageItem;
