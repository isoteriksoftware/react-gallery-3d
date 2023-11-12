import React, { useMemo } from "react";
import { SolidColorItemProps } from "./GalleryItem.types";
import { SolidColorItemMaterial } from "../../core";
import GalleryItem from "./GalleryItem";
import { Mesh } from "three";

const SolidColorItem = React.forwardRef<Mesh, SolidColorItemProps>(
  ({ color, children, ...rest }, ref) => {
    const material = useMemo(() => {
      return new SolidColorItemMaterial(color);
    }, [color]);

    return (
      <GalleryItem ref={ref} itemMaterial={material} {...rest}>
        {children}
      </GalleryItem>
    );
  },
);

export default SolidColorItem;
