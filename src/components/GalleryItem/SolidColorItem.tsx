import React, { useMemo } from "react";
import { SolidColorItemProps } from "./GalleryItem.types";
import { SolidColorItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";

const SolidColorItem: React.FC<SolidColorItemProps> = ({ color, children }) => {
  const material = useMemo(() => {
    return new SolidColorItemMaterial(color);
  }, [color]);

  return <GalleryItem material={material}>{children}</GalleryItem>;
};

export default SolidColorItem;
