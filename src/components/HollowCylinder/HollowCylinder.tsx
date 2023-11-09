import React, { useMemo } from "react";
import { HollowCylinderProps } from "./HollowCylinder.types";
import { CylinderGeometry, Mesh } from "three";
import { CSG } from "three-csg-ts";
import { ViewRendererProps } from "../../core";

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

  const sectionAngle = useMemo(() => (2 * Math.PI) / items.length, [items.length]);
  const outerRadius = useMemo(() => width / 2, [width]);
  const innerRadius = useMemo(
    () => outerRadius * innerRadiusPercent,
    [outerRadius, innerRadiusPercent],
  );

  const meshes = useMemo(() => {
    const sides = items.length;
    const props = {
      width,
      height,
      radialSegments,
      heightSegments,
      innerRadiusPercent,
      items,
    };

    return Array.from({ length: sides }, (_, index) => {
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
      const finalMesh = CSG.subtract(outerMesh, innerMesh);
      finalMesh.material = items[index].generateMaterial(finalMesh.geometry, props);

      return finalMesh;
    });
  }, [items, width, innerRadiusPercent, height, radialSegments, heightSegments]);

  const cachedProps = useMemo(() => {
    const props: ViewRendererProps = {
      width: width!,
      height: height!,
      radialSegments: radialSegments!,
      heightSegments: heightSegments!,
      innerRadiusPercent: innerRadiusPercent!,
      items: items!,
      index: 0,
      sectionAngle,
      outerRadius,
      innerRadius,
    };

    return props;
  }, [width, height, radialSegments, heightSegments, innerRadiusPercent, items]);

  return (
    <group position={[0, 0, 0]} {...rest}>
      {meshes.map((mesh, index) => {
        cachedProps.index = index;

        return (
          <primitive key={index} object={mesh} position={[0, 0, 0]}>
            {items[index].renderView(cachedProps)}
          </primitive>
        );
      })}
    </group>
  );
};

export default HollowCylinder;
