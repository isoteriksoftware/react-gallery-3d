import { Vector3 } from "three";

/**
 * Calculates the position and orientation vectors for an object to be placed on a gallery item (cylinder segment).
 * If position or lookAt vectors are not provided, new vectors will be created.
 *
 * @param {number} itemIndex - The index of the item in the gallery.
 * @param {number} outerRadius - The outer radius of the item.
 * @param {number} sectionAngle - The angular size of the item in radians.
 * @param itemCount - The total number of items(segments) in the gallery.
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
  objectOffset: number = 0,
  position: Vector3 = new Vector3(),
  orientation: Vector3 = new Vector3(),
): { position: Vector3; orientation: Vector3 } => {
  // Calculate the center angle for the segment, taking into account the gallery's global rotation offset if necessary
  // If the gallery starts segmenting from an angle other than the mathematically assumed zero angle,
  // you may need to determine and add a globalRotationOffset here.
  const globalRotationOffset = sectionAngle / outerRadius / 2;
  const centerAngle =
    ((itemCount - itemIndex) * sectionAngle + sectionAngle / 2 - globalRotationOffset) %
    (2 * Math.PI);

  // Convert polar coordinates to Cartesian coordinates for the position
  position.set(outerRadius * Math.cos(centerAngle), 0, outerRadius * Math.sin(centerAngle));

  // The orientation vector should point inwards, towards the center of the gallery
  orientation.set(Math.cos(centerAngle), 0, Math.sin(centerAngle)).normalize();

  // Adjust the position by the objectOffset along the orientation vector
  position.addScaledVector(orientation, objectOffset);

  return { position, orientation };
};
