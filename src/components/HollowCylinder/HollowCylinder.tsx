import React, { Fragment, useMemo } from "react";
import { HollowCylinderProps } from "./HollowCylinder.types";
import { CylinderGeometry, Mesh } from "three";
import { CSG } from "three-csg-ts";
import { ViewRendererParams } from "../../core";

const HollowCylinder: React.FC<HollowCylinderProps> = ({
  width = 120,
  height = 50,
  radialSegments = 50,
  heightSegments = 1,
  innerRadiusPercent = 0.99,
  items,
  ...rest
}) => {
  if (items.length < 3) {
    throw new Error("At least 3 items are required");
  }

  const elements = useMemo(() => {
    const sides = items.length;
    const sectionAngle = (2 * Math.PI) / sides;
    const outerRadius = width / 2;
    const innerRadius = outerRadius * innerRadiusPercent;

    const props = {
      width,
      height,
      radialSegments,
      heightSegments,
      innerRadiusPercent,
      items,
    };

    const rendererProps: ViewRendererParams = {
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
      rendererProps.index = index;

      return (
        <primitive object={finalMesh} position={[0, 0, 0]}>
          {items[index].renderView(rendererProps)}
        </primitive>
      );
    });
  }, [items, width, innerRadiusPercent, height, radialSegments, heightSegments]);

  return (
    <group position={[0, 0, 0]} {...rest}>
      {elements.map((element, index) => {
        return <Fragment key={index}>{element}</Fragment>;
      })}
    </group>
  );
};

export default HollowCylinder;
