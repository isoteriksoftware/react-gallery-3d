import { Vector3 } from "three";

/**
 * Calculates the position and orientation vectors for an object to be placed on a gallery item (cylinder segment).
 * If position or lookAt vectors are not provided, new vectors will be created.
 *
 * @param {number} itemIndex - The index of the item in the gallery.
 * @param {number} outerRadius - The outer radius of the item.
 * @param {number} sectionAngle - The angular size of the item in radians.
 * @param {Vector3} [position] - Optional vector to be filled with the calculated position.
 * @param {Vector3} [orientation] - Optional vector to be filled with the calculated orientation.
 * @returns {{ position: Vector3, orientation: Vector3 }} - The position and orientation vectors.
 */
export const calculatePlacementOnGalleryItem = (
  itemIndex: number,
  outerRadius: number,
  sectionAngle: number,
  position: Vector3 = new Vector3(),
  orientation: Vector3 = new Vector3(),
): { position: Vector3; orientation: Vector3 } => {
  // Calculate the angle to the center of the segment in radians
  const centerAngle = (itemIndex + 0.5) * sectionAngle;

  // Convert polar coordinates to Cartesian coordinates for the position
  position.set(outerRadius * Math.cos(centerAngle), 0, outerRadius * Math.sin(centerAngle));

  // The lookAt vector is the normalized position vector
  orientation.set(position.x, position.y, position.z).normalize();

  return { position, orientation };
};
