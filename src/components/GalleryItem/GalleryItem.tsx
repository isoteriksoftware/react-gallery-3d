import { GALLERY_ITEM_NO_PROVIDER_FLAG, GalleryItemProps } from "./GalleryItem.types";
import React, { useContext, useEffect, useMemo } from "react";
import useGallery from "../Gallery/useGallery";
import { CylinderGeometry, Mesh } from "three";
import { CSG } from "three-csg-ts";
import GalleryItemContext from "./GalleryItemContext";
import GalleryItemMaterial from "../../core/GalleryItemMaterial";

const GalleryItem = React.forwardRef<GalleryItemMaterial, GalleryItemProps>(
  ({ material, children }, ref) => {
    const itemData = useContext(GalleryItemContext);
    if (itemData === GALLERY_ITEM_NO_PROVIDER_FLAG) {
      throw new Error("GalleryItem must be a child of Gallery");
    }

    const { outerRadius, height, radialSegments, heightSegments, sectionAngle, innerRadius } =
      useGallery().item;

    const generatedMaterial = useMemo(() => {
      return material.generate();
    }, [material]);

    useEffect(() => {
      if (ref && typeof ref === "object" && "current" in ref) {
        (ref as React.MutableRefObject<GalleryItemMaterial>).current = material;
      }
    }, [material]);

    const mesh = useMemo(() => {
      const outerGeometry = new CylinderGeometry(
        outerRadius,
        outerRadius,
        height,
        radialSegments,
        heightSegments,
        false,
        itemData.itemIndex * sectionAngle,
        sectionAngle,
      );
      const outerMesh = new Mesh(outerGeometry);

      const innerGeometry = new CylinderGeometry(
        innerRadius,
        innerRadius,
        height,
        radialSegments,
        heightSegments,
        false,
        itemData.itemIndex * sectionAngle,
        sectionAngle,
      );
      const innerMesh = new Mesh(innerGeometry);
      innerMesh.position.y = -0.01; // Offset to prevent z-fighting

      // Perform CSG subtraction to hollow out the segment
      const finalMesh = CSG.subtract(outerMesh, innerMesh);
      finalMesh.material = generatedMaterial;

      return finalMesh;
    }, [
      outerRadius,
      height,
      radialSegments,
      heightSegments,
      sectionAngle,
      innerRadius,
      material,
      itemData.itemIndex,
    ]);

    return <primitive object={mesh}>{children}</primitive>;
  },
);

export default GalleryItem;
