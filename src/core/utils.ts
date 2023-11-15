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
  const alignmentOffset =
    itemAlignmentOffset ??
    (itemCount <= 8
      ? calculateItemAlignmentOffsetPolynomial(itemCount)
      : calculateItemAlignmentOffsetQuadratic(itemCount));
  const angularOffset = sectionAngle / 2 + alignmentOffset;

  const centerAngle = ((itemCount - itemIndex) * sectionAngle + angularOffset) % (2 * Math.PI);

  position.set(outerRadius * Math.cos(centerAngle), 0, outerRadius * Math.sin(centerAngle));

  orientation.set(Math.cos(centerAngle), 0, Math.sin(centerAngle)).normalize();

  position.addScaledVector(orientation, objectOffset);

  return { position, orientation };
};

/**
 * Calculates the angular offset to align an object within a gallery item (segment) using a polynomial of degree 5.
 * The polynomial coefficients were determined through interpolation
 * of the points (3, -0.5), (4, 0), (5, 0.3), (6, 0.52), (7, 0.66), and (8, 0.78). This function is guaranteed to
 * return a value between -0.5 and 0.78 for any item count between 3 and 8.
 * It returns the angular offset for a given item count.
 * Compared to {@link calculateItemAlignmentOffsetQuadratic}, this is more accurate but also more expensive, and
 * it doesn't yield good results for item counts outside the range of 3 and 8.
 *
 * @param {number} itemCount - The total number of items in the gallery.
 */
export const calculateItemAlignmentOffsetPolynomial = (itemCount: number): number => {
  const coefficients = [0.0015, -0.0425, 0.4775, -2.6975, 7.981, -9.98];
  const y = coefficients.reduce(
    (acc, curr, i) => acc + curr * Math.pow(itemCount, coefficients.length - 1 - i),
    0,
  );
  return parseFloat(y.toFixed(2));
};

/**
 * Calculates the angular offset to align an object within a gallery item (segment) using a quadratic polynomial.
 * The polynomial coefficients were determined through fitting
 * to the points (3, -0.5), (4, 0), (5, 0.3), (6, 0.52), (7, 0.66), and (8, 0.78).
 * It returns the angular offset for a given item count.
 *
 * Compared to {@link calculateItemAlignmentOffsetPolynomial}, this is less accurate but also less expensive,
 * and it yields close enough results for item counts outside the range of 3 and 8.
 *
 * @param {number} x - The x value for which the y value needs to be calculated.
 */
export const calculateItemAlignmentOffsetQuadratic = (x: number): number => {
  const coefficients = [-0.04535714, 0.74464286, -2.29785714];
  const y = coefficients.reduce(
    (acc, curr, i) => acc + curr * Math.pow(x, coefficients.length - 1 - i),
    0,
  );
  return parseFloat(y.toFixed(2));
};
