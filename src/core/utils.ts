import { Vector3 } from "three";

/**
 * Calculates the position and orientation vectors for an object to be placed on a gallery item (cylinder segment).
 * If position or lookAt vectors are not provided, new vectors will be created.
 *
 * @param {number} itemIndex - The index of the item in the gallery.
 * @param {number} outerRadius - The outer radius of the item.
 * @param {number} sectionAngle - The angular size of the item in radians.
 * @param {number} itemCount - The total number of items in the gallery.
 * @param {number} itemAlignmentOffset - An optional angular offset to adjust the alignment
 *  *                                            of the object within the item. This value is calculated if not provided.
 * @param {number} [objectOffset=0] - The offset distance from the item's surface to the object's center. Defaults to 0.
 * @param {Vector3} [position] - Optional vector to be filled with the calculated position.
 * @param {Vector3} [orientation] - Optional vector to be filled with the calculated orientation.
 * @returns {{ position: Vector3, orientation: Vector3 }} - The position and orientation vectors.
 */
export const calculatePlacementOnGalleryItem = (
  itemIndex: number,
  outerRadius: number,
  sectionAngle: number,
  itemCount: number,
  itemAlignmentOffset?: number,
  objectOffset: number = 0,
  position: Vector3 = new Vector3(),
  orientation: Vector3 = new Vector3(),
): { position: Vector3; orientation: Vector3 } => {
  const alignmentOffset = itemAlignmentOffset ?? calculateItemAlignmentOffset(itemCount);
  const angularOffset = sectionAngle / 2 + alignmentOffset;

  const centerAngle = ((itemCount - itemIndex) * sectionAngle + angularOffset) % (2 * Math.PI);

  position.set(outerRadius * Math.cos(centerAngle), 0, outerRadius * Math.sin(centerAngle));

  orientation.set(Math.cos(centerAngle), 0, Math.sin(centerAngle)).normalize();

  position.addScaledVector(orientation, objectOffset);

  return { position, orientation };
};

/**
 * Calculates the angular offset to align an object within a gallery item (segment) using a quadratic polynomial.
 * The polynomial used is y = -0.0407x^2 + 0.6961x - 2.1934, which was derived from a set of data points to approximate
 * their pattern.
 *
 * @param {number} itemCount - The total number of items in the gallery.
 */
export const calculateItemAlignmentOffset = (itemCount: number) => {
  const a = -0.04071429;
  const b = 0.69614286;
  const c = -2.19342857;

  return a * itemCount * itemCount + b * itemCount + c;
};
