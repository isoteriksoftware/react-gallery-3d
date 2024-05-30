import React, { useMemo } from "react";
import { TransparentItemProps } from "./TransparentItem.types";
import { TransparentItemMaterial } from "../../core";
import { GalleryItem } from "../GalleryItem";
import { Mesh } from "three";

export const TransparentItem = React.forwardRef<Mesh, TransparentItemProps>(
  ({ opacity = 0, children, ...rest }, ref) => {
    const material = useMemo(() => {
      return new TransparentItemMaterial(opacity);
    }, [opacity]);

    return (
      <GalleryItem ref={ref} itemMaterial={material} {...rest}>
        {children}
      </GalleryItem>
    );
  },
);
