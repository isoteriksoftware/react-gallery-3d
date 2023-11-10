import React, { useMemo } from "react";
import { ImageItemProps } from "./GalleryItem.types";
import { ImageItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";

const ImageItem: React.FC<ImageItemProps> = ({ src, texture, children }) => {
  if (!src && !texture) {
    throw new Error("Either src or texture must be provided");
  }

  const material = useMemo(() => {
    return new ImageItemMaterial(texture ?? src!);
  }, [src, texture]);

  return <GalleryItem material={material}>{children}</GalleryItem>;
};

export default ImageItem;
