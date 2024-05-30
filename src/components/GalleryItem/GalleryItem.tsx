import { GALLERY_ITEM_NO_PROVIDER_FLAG, GalleryItemProps } from "./GalleryItem.types";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useGallery } from "../Gallery";
import { CylinderGeometry, Mesh } from "three";
import { CSG } from "three-csg-ts";
import GalleryItemContext from "./GalleryItemContext";

export const GalleryItem = React.forwardRef<Mesh, GalleryItemProps>(
  ({ itemMaterial, children, onInit }, ref) => {
    const itemData = useContext(GalleryItemContext);
    if (itemData === GALLERY_ITEM_NO_PROVIDER_FLAG) {
      throw new Error("GalleryItem must be a child of Gallery");
    }

    const { itemIndex } = itemData;
    const { outerRadius, height, radialSegments, heightSegments, sectionAngle, innerRadius } =
      useGallery().item;

    const createCylinderGeometry = useCallback(
      (radius: number) => {
        return new CylinderGeometry(
          radius,
          radius,
          height,
          radialSegments,
          heightSegments,
          false,
          itemIndex * sectionAngle,
          sectionAngle,
        );
      },
      [height, heightSegments, itemIndex, radialSegments, sectionAngle],
    );

    const generatedMaterial = useMemo(() => {
      return itemMaterial.generate();
    }, [itemMaterial]);

    const outerMesh = useMemo(() => new Mesh(), []);
    const innerMesh = useMemo(() => new Mesh(), []);

    const outerGeometry = useMemo(() => {
      return createCylinderGeometry(outerRadius);
    }, [createCylinderGeometry, outerRadius]);

    const innerGeometry = useMemo(() => {
      return createCylinderGeometry(innerRadius);
    }, [createCylinderGeometry, innerRadius]);

    const mesh = useMemo(() => {
      innerMesh.geometry = innerGeometry;
      outerMesh.geometry = outerGeometry;

      // Perform CSG subtraction to hollow out the segment
      return CSG.subtract(outerMesh, innerMesh);
    }, [innerGeometry, innerMesh, outerGeometry, outerMesh]);

    useEffect(() => {
      outerMesh.geometry = outerGeometry;
    }, [outerGeometry, outerMesh]);

    useEffect(() => {
      innerMesh.geometry = innerGeometry;
      innerMesh.position.y = -0.01; // Offset to prevent z-fighting
    }, [innerGeometry, innerMesh]);

    useEffect(() => {
      if (mesh) {
        mesh.material = generatedMaterial;
      }
    }, [generatedMaterial, mesh]);

    useEffect(() => {
      if (mesh && itemMaterial && generatedMaterial) {
        onInit?.({
          mesh,
          material: generatedMaterial,
          itemMaterial,
        });
      }
    }, [generatedMaterial, itemMaterial, mesh, onInit]);

    return (
      <primitive object={mesh} ref={ref}>
        {children}
      </primitive>
    );
  },
);
