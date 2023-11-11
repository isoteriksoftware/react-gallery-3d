import React, { useMemo } from "react";
import { SolidColorItemProps } from "./GalleryItem.types";
import { SolidColorItemMaterial, GalleryItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";

const SolidColorItem = React.forwardRef<GalleryItemMaterial, SolidColorItemProps>(
  ({ color, children }, ref) => {
    const material = useMemo(() => {
      return new SolidColorItemMaterial(color);
    }, [color]);

    return (
      <GalleryItem material={material} ref={ref}>
        {children}
      </GalleryItem>
    );
  },
);

export default SolidColorItem;
