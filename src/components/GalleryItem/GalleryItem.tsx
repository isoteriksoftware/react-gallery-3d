import { GalleryItemProps } from "./GalleryItem.types";
import { useContext, useMemo } from "react";
import useGallery from "../Gallery/useGallery";
import { CylinderGeometry, Mesh } from "three";
import { CSG } from "three-csg-ts";
import GalleryItemContext from "./GalleryItemContext";

const GalleryItem = ({ material, children }: GalleryItemProps) => {
  const itemIndex = useContext(GalleryItemContext);

  const { outerRadius, height, radialSegments, heightSegments, sectionAngle, innerRadius } =
    useGallery().item;

  const generatedMaterial = useMemo(() => {
    return material.generate();
  }, [material]);

  const mesh = useMemo(() => {
    const outerGeometry = new CylinderGeometry(
      outerRadius,
      outerRadius,
      height,
      radialSegments,
      heightSegments,
      false,
      itemIndex * sectionAngle,
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
      itemIndex * sectionAngle,
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
    itemIndex,
  ]);

  return <primitive object={mesh}>{children}</primitive>;
};

export default GalleryItem;
