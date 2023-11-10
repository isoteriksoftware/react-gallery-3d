import { HollowCylinderProps } from "react-gallery-3d";
import { ReactNode } from "react";

export type ViewRendererParams = Required<
  Pick<
    HollowCylinderProps,
    "width" | "height" | "radialSegments" | "heightSegments" | "innerRadiusPercent" | "items"
  >
> & {
  index: number;
  sectionAngle: number;
  outerRadius: number;
  innerRadius: number;
};

export type ViewRenderer = (viewRendererParams: ViewRendererParams) => ReactNode;
