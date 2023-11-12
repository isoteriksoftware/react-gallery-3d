import React, { useMemo } from "react";
import { ImageItemProps } from "./GalleryItem.types";
import { ImageItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";

const ImageItem: React.FC<ImageItemProps> = ({ src, texture, children, ...rest }) => {
  if (!src && !texture) {
    throw new Error("Either src or texture must be provided");
  }

  const material = useMemo(() => {
    return new ImageItemMaterial(texture ?? src!);
  }, [src, texture]);

  return (
    <GalleryItem itemMaterial={material} {...rest}>
      {children}
    </GalleryItem>
  );
};

export default ImageItem;
