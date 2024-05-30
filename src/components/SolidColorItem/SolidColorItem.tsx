import React, { useEffect, useMemo } from "react";
import { SolidColorItemProps } from "./SolidColorItem.types";
import { GalleryItem } from "../GalleryItem";
import { Mesh, MeshStandardMaterial } from "three";

export const SolidColorItem = React.forwardRef<Mesh, SolidColorItemProps>(
  ({ color, children, ...rest }, ref) => {
    const material = useMemo(() => {
      return new MeshStandardMaterial({
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    }, []);

    useEffect(() => {
      material.color.set(color);
    }, [color, material.color]);

    return (
      <GalleryItem ref={ref} material={material} {...rest}>
        {children}
      </GalleryItem>
    );
  },
);
