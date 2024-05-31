import { DoubleSide, MeshStandardMaterial, VideoTexture } from "three";
import { useEffect, useMemo } from "react";
import { UseVideoMaterialOptions, UseVideoMaterialResult } from "react-gallery-3d";

export const useVideoMaterial = ({
  src,
  wrappedMaterial,
  crossOrigin,
  autoplay = true,
  muted = true,
  loop = true,
}: UseVideoMaterialOptions): UseVideoMaterialResult => {
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

  const video = useMemo(() => document.createElement("video"), []);
  const texture = useMemo(() => new VideoTexture(video), [video]);

  useEffect(() => {
    material.map = texture;
  }, [material, texture]);

  useEffect(() => {
    video.loop = loop;
    video.muted = muted;

    if (crossOrigin) {
      video.crossOrigin = crossOrigin;
    }
  }, [crossOrigin, loop, muted, src, video]);

  useEffect(() => {
    video.src = src;

    if (autoplay) {
      video.muted = true; // Required for autoplay to work
      video.play();
    }
  }, [autoplay, src, video]);

  return { video, texture, material };
};
