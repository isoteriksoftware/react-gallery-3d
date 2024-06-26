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
      disableAutoDispose,
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
    const [materialApplied, setMaterialApplied] = useState(false);

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
        width: globalWidth,
        height: globalHeight,
        radialSegments: globalRadialSegments,
        heightSegments: globalHeightSegments,
        sectionAngle: globalSectionAngle,
        innerRadiusPercent: globalInnerRadiusPercent,
      },
    } = galleryState;

    const {
      sectionAngle,
      outerRadius,
      innerRadius,
      height,
      radialSegments,
      heightSegments,
      innerRadiusPercent,
      width,
    } = useMemo(() => {
      const sectionAngle = preferredSectionAngle || globalSectionAngle;
      const width = preferredWidth || globalWidth;
      const outerRadius = width ? width / 2 : globalOuterRadius;
      const innerRadiusPercent = preferredInnerRadiusPercent || globalInnerRadiusPercent;
      const innerRadius = outerRadius - outerRadius * innerRadiusPercent;
      const height = preferredHeight || globalHeight;
      const radialSegments = preferredRadialSegments || globalRadialSegments;
      const heightSegments = preferredHeightSegments || globalHeightSegments;

      return {
        sectionAngle,
        outerRadius,
        innerRadius,
        innerRadiusPercent,
        width,
        height,
        radialSegments,
        heightSegments,
      };
    }, [
      preferredSectionAngle,
      globalSectionAngle,
      preferredWidth,
      globalWidth,
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
        setMaterialApplied(true);
      }
    }, [material, mesh]);

    useEffect(() => {
      return () => {
        if (!disableAutoDispose) {
          if (Array.isArray(material)) {
            for (const mt of material) {
              mt.dispose();
            }
          } else {
            material.dispose();
          }
        }
      };
    }, [disableAutoDispose, material]);

    if (itemIndex === undefined || !mesh || !materialApplied) {
      return null;
    }

    return (
      <primitive object={mesh} ref={ref} {...rest}>
        <GalleryItemContext.Provider
          value={{
            itemIndex,
            sectionAngle,
            outerRadius,
            innerRadius,
            innerRadiusPercent,
            width,
            height,
            radialSegments,
            heightSegments,
          }}
        >
          {children}
        </GalleryItemContext.Provider>
      </primitive>
    );
  },
);
