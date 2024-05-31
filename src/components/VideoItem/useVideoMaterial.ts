import { DoubleSide, MeshStandardMaterial, VideoTexture } from "three";
import { useEffect, useMemo } from "react";
import { UseVideoMaterialOptions, UseVideoMaterialResult } from "react-gallery-3d";

/**
 * This hook creates a material mapped to a video from the provided source.
 * An existing material can be wrapped using the wrappedMaterial prop.
 *
 * If no wrappedMaterial is provided, a new MeshStandardMaterial is created.
 *
 * @param src The source of the video.
 * @param wrappedMaterial The material to wrap.
 * @param crossOrigin The cross-origin attribute for the video.
 * @param autoplay Whether the video should autoplay.
 * @param muted Whether the video should be muted.
 * @param loop Whether the video should loop.
 */
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
