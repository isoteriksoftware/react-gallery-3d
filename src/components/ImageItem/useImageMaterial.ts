import { DoubleSide, MeshStandardMaterial, TextureLoader } from "three";
import { useEffect, useMemo } from "react";
import { UseImageMaterialOptions, UseImageMaterialReturnType } from "./ImageItem.types";

/**
 * This hook creates a material mapped to a texture from the provided source.
 *
 * An existing material can be wrapped using the wrappedMaterial prop.
 * If no wrappedMaterial is provided, a new MeshStandardMaterial is created.
 *
 * If a texture is provided, it is used instead of loading the source.
 *
 * @param src The source of the image.
 * @param texture The texture to use.
 * @param wrappedMaterial The material to wrap.
 * @returns The texture and material.
 */
export const useImageMaterial = ({
  src,
  texture,
  wrappedMaterial,
}: UseImageMaterialOptions): UseImageMaterialReturnType => {
  if (!src && !texture) {
    throw new Error("Either src or texture must be provided");
  }

  const material = useMemo(() => {
    if (wrappedMaterial) {
      return wrappedMaterial;
    }

    return new MeshStandardMaterial({
      toneMapped: true,
      side: DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
  }, [wrappedMaterial]);

  const targetTexture = useMemo(() => {
    if (texture) {
      return texture;
    }

    return new TextureLoader().load(src!);
  }, [src, texture]);

  useEffect(() => {
    material.map = targetTexture;
  }, [material, targetTexture]);

  return {
    texture: targetTexture,
    material,
  };
};
