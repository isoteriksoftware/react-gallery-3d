import React, { useMemo } from "react";
import { SolidColorItemProps } from "./GalleryItem.types";
import { SolidColorItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";

const SolidColorItem: React.FC<SolidColorItemProps> = ({ color, children, ...rest }) => {
  const material = useMemo(() => {
    return new SolidColorItemMaterial(color);
  }, [color]);

  return (
    <GalleryItem itemMaterial={material} {...rest}>
      {children}
    </GalleryItem>
  );
};

export default SolidColorItem;
