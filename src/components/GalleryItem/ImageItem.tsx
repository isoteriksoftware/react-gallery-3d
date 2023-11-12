import React, { useMemo } from "react";
import { GalleryItemRefData, ImageItemProps } from "./GalleryItem.types";
import { ImageItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";

const ImageItem = React.forwardRef<GalleryItemRefData, ImageItemProps>(
  ({ src, texture, children }, ref) => {
    if (!src && !texture) {
      throw new Error("Either src or texture must be provided");
    }

    const material = useMemo(() => {
      return new ImageItemMaterial(texture ?? src!);
    }, [src, texture]);

    return (
      <GalleryItem itemMaterial={material} ref={ref}>
        {children}
      </GalleryItem>
    );
  },
);

export default ImageItem;
