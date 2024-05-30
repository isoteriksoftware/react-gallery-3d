import { DoubleSide, MeshStandardMaterial, VideoTexture } from "three";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { MappableMaterial } from "react-gallery-3d";

export type UseVideoMaterialOptions = {
  src: string;
  sourceMaterial?: MappableMaterial;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  crossOrigin?: JSX.IntrinsicElements["video"]["crossOrigin"];
};

export type UseVideoMaterialResult = {
  video: HTMLVideoElement;
  texture: VideoTexture;
  material: MappableMaterial;
};

export const useVideoMaterial = ({
  src,
  sourceMaterial,
  crossOrigin,
  autoplay = true,
  muted = true,
  loop = true,
}: UseVideoMaterialOptions): UseVideoMaterialResult => {
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

  useLayoutEffect(() => {
    if (autoplay) {
      video.muted = true; // Required for autoplay to work
      video.play();
    }
  }, [autoplay, video]);

  return { video, texture, material };
};
