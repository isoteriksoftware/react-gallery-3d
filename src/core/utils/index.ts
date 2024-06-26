import { Vector3 } from "three";

export type ObjectAlignment = {
  /**
   * The calculated position for the object.
   */
  position: Vector3;

  /**
   * The calculated orientation for the object.
   */
  orientation: Vector3;
};

/**
 * Calculates the position and orientation vectors for an object to be placed on a gallery item (cylinder segment).
 * If position or orientation vectors are not provided, new vectors will be created.
 *
 * @param {number} itemIndex - The index of the item in the gallery.
 * @param {number} outerRadius - The outer radius of the item.
 * @param {number} sectionAngle - The angular size of the item in radians.
 * @param {number} itemCount - The total number of items in the gallery.
 * @param {number} [itemAlignmentOffset] - An optional angular offset to adjust the alignment
 *                                        of the object within the item. This value is calculated if not provided.
 * @param {number} [objectOffset] - The offset distance from the item's surface to the object's center on the z-axis. Defaults to 0.
 * @param {Vector3} [position] - Optional vector to be filled with the calculated position.
 * @param {Vector3} [orientation] - Optional vector to be filled with the calculated orientation.
 * @returns {ObjectAlignment} - The position and orientation vectors.
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
): ObjectAlignment => {
  const alignmentOffset =
    itemAlignmentOffset ??
    (itemCount <= 8
      ? calculateItemAlignmentOffsetPolynomial(itemCount)
      : calculateItemAlignmentOffsetQuadratic(itemCount));

  // The angular offset to align the object within the item.
  // It is calculated as the sum of the angular size of the item divided by 2 and the alignment offset.
  const angularOffset = sectionAngle / 2 + alignmentOffset;

  // The angle of the center of the item in the gallery.
  const centerAngle = ((itemCount - itemIndex) * sectionAngle + angularOffset) % (2 * Math.PI);

  // The position of the object on the item's surface.
  // It is calculated by projecting the center of the item to the surface of the cylinder.
  position.set(outerRadius * Math.cos(centerAngle), 0, outerRadius * Math.sin(centerAngle));

  // The orientation of the object.
  // It is calculated by creating a vector from the center of the item to the object's position.
  orientation.set(Math.cos(centerAngle), 0, Math.sin(centerAngle)).normalize();

  // The object's offset from the item's surface.
  position.addScaledVector(orientation, objectOffset);

  return { position, orientation };
};

/**
 * Calculates the angular offset to align an object within a gallery item (segment) using a polynomial of degree 5.
 * The polynomial coefficients were determined through interpolation
 * of the points (3, -0.5), (4, 0), (5, 0.3), (6, 0.52), (7, 0.66), and (8, 0.78).
 *
 * This function is guaranteed to
 * return a value between -0.5 and 0.78 for any item count between 3 and 8.
 *
 * Compared to {@link calculateItemAlignmentOffsetQuadratic}, this is more accurate but also less efficient, and
 * it doesn't yield good results for item counts outside the range of 3 and 8.
 *
 * @param {number} itemCount - The total number of items in the gallery.
 * @returns {number} - The angular offset for the given item count.
 */
export const calculateItemAlignmentOffsetPolynomial = (itemCount: number): number => {
  const coefficients = [0.0015, -0.0425, 0.4775, -2.6975, 7.981, -9.98];
  return calculateAngularOffset(coefficients, itemCount);
};

/**
 * Calculates the angular offset to align an object within a gallery item (segment) using a quadratic polynomial.
 * The polynomial coefficients were determined through fitting
 * to the points (3, -0.5), (4, 0), (5, 0.3), (6, 0.52), (7, 0.66), and (8, 0.78).
 * It returns the angular offset for a given item count.
 *
 * Compared to {@link calculateItemAlignmentOffsetPolynomial}, this is less accurate but also more efficient,
 * and it yields close enough results for item counts outside the range of 3 and 8.
 *
 * @param {number} itemCount - The total number of items in the gallery.
 */
export const calculateItemAlignmentOffsetQuadratic = (itemCount: number): number => {
  const coefficients = [-0.04535714, 0.74464286, -2.29785714];
  return calculateAngularOffset(coefficients, itemCount);
};

const calculateAngularOffset = (coefficients: number[], itemCount: number) => {
  const offset = coefficients.reduce(
    (acc, curr, i) => acc + curr * Math.pow(itemCount, coefficients.length - 1 - i),
    0,
  );

  return parseFloat(offset.toFixed(2));
};
