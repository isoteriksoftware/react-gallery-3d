import { Object3D } from "three";
import { TransparentItemProps } from "react-gallery-3d";
import { Object3DProps } from "@react-three/fiber";

export type ObjectItemProps = TransparentItemProps & {
  object?: Object3D | null;
  objectProps?: Object3DProps;
  objectOffset?: number;
  objectAlignmentOffset?: number;
  disableObjectRender?: boolean;
  onObjectAlignmentChange?: (object: Object3D) => void;
};
