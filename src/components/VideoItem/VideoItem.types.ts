import { GalleryItemProps } from "../GalleryItem";

export type VideoItemProps = Omit<GalleryItemProps, "itemMaterial"> & {
  src: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  crossOrigin?: "anonymous" | "use-credentials" | "" | null;
};
