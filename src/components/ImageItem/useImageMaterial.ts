import { DoubleSide, MeshStandardMaterial, Texture, TextureLoader } from "three";
import { MappableMaterial } from "react-gallery-3d";
import { useEffect, useMemo } from "react";

export type UseImageMaterialOptions = {
  src?: string;
  texture?: Texture;
  sourceMaterial?: MappableMaterial;
};

export type UseImageMaterialResult = {
  texture: Texture;
  material: MappableMaterial;
};

export const useImageMaterial = ({
  src,
  texture,
  sourceMaterial,
}: UseImageMaterialOptions): UseImageMaterialResult => {
  if (!src && !texture) {
    throw new Error("Either src or texture must be provided");
  }

  const material = useMemo(() => {
    if (sourceMaterial) {
      return sourceMaterial;
    }

    return new MeshStandardMaterial({
      toneMapped: true,
      side: DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
  }, [sourceMaterial]);

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
