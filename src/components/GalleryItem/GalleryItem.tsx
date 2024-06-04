import { GalleryItemProps } from "./GalleryItem.types";
import React, { forwardRef, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { GALLERY_NO_PROVIDER_FLAG } from "../Gallery";
import { CylinderGeometry, Mesh } from "three";
import { CSG } from "three-csg-ts";
import { GalleryItemContext } from "./GalleryItemContext";
import { GalleryContext } from "../Gallery/GalleryContext";
import { v4 as uuid } from "uuid";

/**
 * This component is a child of the gallery component, and it represents an item in the gallery.
 *
 * @param material The material to use for the item.
 * @param children The children to render.
 */
export const GalleryItem = forwardRef<Mesh, GalleryItemProps>(
  (
    {
      material,
      children,
      width: preferredWidth,
      height: preferredHeight,
      radialSegments: preferredRadialSegments,
      heightSegments: preferredHeightSegments,
      innerRadiusPercent: preferredInnerRadiusPercent,
      sectionAngle: preferredSectionAngle,
      ...rest
    },
    ref,
  ) => {
    const galleryState = useContext(GalleryContext);
    if (galleryState === GALLERY_NO_PROVIDER_FLAG) {
      throw new Error("GalleryItem must be a child of Gallery");
    }

    const { registerItem, unregisterItem, itemsId } = galleryState;

    const itemId = useMemo(() => uuid(), []);
    const [itemIndex, setItemIndex] = useState<number>();

    useEffect(() => {
      registerItem(itemId);
      return () => unregisterItem(itemId);
    }, [itemId, registerItem, unregisterItem]);

    useEffect(() => {
      const index = itemsId.indexOf(itemId);
      setItemIndex(index === -1 ? undefined : index);
    }, [itemId, itemsId]);

    const {
      item: {
        outerRadius: globalOuterRadius,
        height: globalHeight,
        radialSegments: globalRadialSegments,
        heightSegments: globalHeightSegments,
        sectionAngle: globalSectionAngle,
        innerRadiusPercent: globalInnerRadiusPercent,
      },
    } = galleryState;

    const { sectionAngle, outerRadius, innerRadius, height, radialSegments, heightSegments } =
      useMemo(() => {
        const sectionAngle = preferredSectionAngle || globalSectionAngle;
        const outerRadius = preferredWidth ? preferredWidth / 2 : globalOuterRadius;
        const innerRadius =
          outerRadius - outerRadius * (preferredInnerRadiusPercent || globalInnerRadiusPercent);
        const height = preferredHeight || globalHeight;
        const radialSegments = preferredRadialSegments || globalRadialSegments;
        const heightSegments = preferredHeightSegments || globalHeightSegments;

        return {
          sectionAngle,
          outerRadius,
          innerRadius,
          height,
          radialSegments,
          heightSegments,
        };
      }, [
        preferredSectionAngle,
        globalSectionAngle,
        preferredWidth,
        globalOuterRadius,
        preferredInnerRadiusPercent,
        globalInnerRadiusPercent,
        preferredHeight,
        globalHeight,
        preferredRadialSegments,
        globalRadialSegments,
        preferredHeightSegments,
        globalHeightSegments,
      ]);

    /**
     * Creates a cylinder geometry with the specified radius.
     *
     * @param radius The radius of the cylinder.
     * @returns The cylinder geometry.
     */
    const createCylinderGeometry = useCallback(
      (radius: number) => {
        return itemIndex === undefined
          ? null
          : new CylinderGeometry(
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

    const outerMesh = useMemo(() => new Mesh(), []);
    const innerMesh = useMemo(() => new Mesh(), []);

    const outerGeometry = useMemo(() => {
      return createCylinderGeometry(outerRadius);
    }, [createCylinderGeometry, outerRadius]);

    const innerGeometry = useMemo(() => {
      return createCylinderGeometry(innerRadius);
    }, [createCylinderGeometry, innerRadius]);

    const mesh = useMemo(() => {
      if (innerGeometry && outerGeometry) {
        innerMesh.geometry = innerGeometry;
        outerMesh.geometry = outerGeometry;

        // Perform CSG subtraction to hollow out the segment
        return CSG.subtract(outerMesh, innerMesh);
      }
    }, [innerGeometry, innerMesh, outerGeometry, outerMesh]);

    useEffect(() => {
      if (outerGeometry) {
        outerMesh.geometry = outerGeometry;
      }
    }, [outerGeometry, outerMesh]);

    useEffect(() => {
      if (innerGeometry) {
        innerMesh.geometry = innerGeometry;
        innerMesh.position.y = -0.01; // Offset to prevent z-fighting
      }
    }, [innerGeometry, innerMesh]);

    useEffect(() => {
      if (mesh) {
        mesh.material = material;
      }
    }, [material, mesh]);

    if (itemIndex === undefined || !mesh) return null;

    return (
      <GalleryItemContext.Provider
        value={{
          itemIndex,
        }}
      >
        <primitive object={mesh} ref={ref} {...rest}>
          {children}
        </primitive>
      </GalleryItemContext.Provider>
    );
  },
);
