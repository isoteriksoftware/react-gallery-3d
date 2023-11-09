import React, { useMemo } from "react";
import { HollowCylinderProps } from "./HollowCylinder.types";
import { CylinderGeometry, Mesh } from "three";
import { CSG } from "three-csg-ts";

const HollowCylinder: React.FC<HollowCylinderProps> = ({
  width = 120,
  height = 50,
  radialSegments = 50,
  heightSegments = 1,
  innerRadiusPercent = 0.9,
  items,
  ...rest
}) => {
  if (items.length < 3) {
    throw new Error("At least 3 items are required");
  }

  const meshes = useMemo(() => {
    const sides = items.length;
    const sectionAngle = (2 * Math.PI) / sides;
    const props = {
      width,
      height,
      radialSegments,
      heightSegments,
      innerRadiusPercent,
      items,
    };

    return Array.from({ length: sides }, (_, index) => {
      const outerRadius = width / 2;
      const innerRadius = outerRadius * innerRadiusPercent;

      const outerGeometry = new CylinderGeometry(
        outerRadius,
        outerRadius,
        height,
        radialSegments,
        heightSegments,
        false,
        index * sectionAngle,
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
        index * sectionAngle,
        sectionAngle,
      );
      const innerMesh = new Mesh(innerGeometry);
      innerMesh.position.y = -0.01; // Offset to prevent z-fighting

      // Perform CSG subtraction to hollow out the segment
      const finalGeometry = CSG.subtract(outerMesh, innerMesh);

      const material = items[index].generateMaterial(finalGeometry.geometry, props);

      return new Mesh(finalGeometry.geometry, material);
    });
  }, [items, width, innerRadiusPercent, height, radialSegments, heightSegments]);

  return (
    <group {...rest}>
      {meshes.map((mesh, index) => (
        <primitive key={index} object={mesh} />
      ))}
    </group>
  );
};

export default HollowCylinder;
