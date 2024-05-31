import { Object3D } from "three";
import { Object3DProps } from "@react-three/fiber";
import { TransparentItemProps } from "../TransparentItem";
import { ObjectAlignment } from "../../core";

export type ObjectItemProps = TransparentItemProps & {
  object?: Object3D | null;
  objectProps?: Object3DProps;
  objectOffset?: number;
  objectAlignmentOffset?: number;
  disableObjectRender?: boolean;
  onObjectAlignmentChange?: (object: Object3D) => void;
  onBeforeObjectAlignmentApplied?: (alignment: ObjectAlignment) => void;
};
