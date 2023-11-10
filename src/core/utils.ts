/**
 * Computes the position and rotation necessary to place an object on the surface of a cylindrical segment.
 * It ensures that the object is correctly aligned with the curvature of the cylinder and faces outward from the surface.
 *
 *
 * @param index - the index of the current segment for which the transformation is being calculated.
 * It's used to determine the angular position around the cylinder where an object (e.g., text or another 3D object)
 * can be placed.
 * @param sectionAngle - the angle of a single segment of the cylinder.
 * @param outerRadius - the radius of the cylinder from its central axis to the outer edge. It's used to calculate how
 * far from the center of the cylinder an object can be placed.
 */
export const calculateCylinderSegmentTransform = (
  index: number,
  sectionAngle: number,
  outerRadius: number,
): {
  position: [number, number, number];
  rotation: [number, number, number];
} => {
  const centerAngle = index * -sectionAngle + sectionAngle;

  const x = outerRadius * Math.cos(centerAngle);
  const z = outerRadius * Math.sin(centerAngle);
  const y = 0;

  const rotationY = Math.PI / 2 - centerAngle;

  return {
    position: [x, y, z],
    rotation: [0, rotationY, 0],
  };
};
