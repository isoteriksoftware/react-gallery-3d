import React, { useMemo } from "react";
import { GalleryItemRefData, SolidColorItemProps } from "./GalleryItem.types";
import { SolidColorItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";

const SolidColorItem = React.forwardRef<GalleryItemRefData, SolidColorItemProps>(
  ({ color, children }, ref) => {
    const material = useMemo(() => {
      return new SolidColorItemMaterial(color);
    }, [color]);

    return (
      <GalleryItem itemMaterial={material} ref={ref}>
        {children}
      </GalleryItem>
    );
  },
);

export default SolidColorItem;
