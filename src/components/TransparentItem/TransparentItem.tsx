import React, { useEffect, useMemo } from "react";
import { TransparentItemProps } from "./TransparentItem.types";
import { GalleryItem } from "../GalleryItem";
import { Mesh, MeshBasicMaterial } from "three";

export const TransparentItem = React.forwardRef<Mesh, TransparentItemProps>(
  ({ opacity = 0, children, ...rest }, ref) => {
    const material = useMemo(() => {
      return new MeshBasicMaterial({
        color: 0xffffff,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        transparent: true,
        opacity: 0,
      });
    }, []);

    useEffect(() => {
      material.opacity = opacity;
    }, [material, opacity]);

    return (
      <GalleryItem ref={ref} material={material} {...rest}>
        {children}
      </GalleryItem>
    );
  },
);
