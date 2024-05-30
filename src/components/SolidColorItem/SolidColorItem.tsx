import React, { useMemo } from "react";
import { SolidColorItemProps } from "./SolidColorItem.types";
import { SolidColorItemMaterial } from "../../core";
import { GalleryItem } from "../GalleryItem";
import { Mesh } from "three";

export const SolidColorItem = React.forwardRef<Mesh, SolidColorItemProps>(
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
