import { Object3D } from "three";
import { Object3DProps } from "@react-three/fiber";
import { TransparentItemProps } from "../TransparentItem";
import { ObjectAlignment } from "../../core";

/**
 * The ObjectItem component properties.
 */
export type ObjectItemProps = TransparentItemProps & {
  /**
   * The object to render.
   * If null, nothing will be rendered.
   */
  object?: Object3D | null;

  /**
   * The object properties.
   */
  objectProps?: Object3DProps;

  /**
   * The object z-axis offset from the center of the item.
   */
  objectOffset?: number;

  /**
   * The object horizontal alignment offset.
   */
  objectAlignmentOffset?: number;

  /**
   * Whether to disable rendering the object.
   * This is useful when you want to render the object in a different way.
   *
   * When rendering is disabled, the objectProps provided will be ignored.
   * It becomes your responsibility to render and update the object directly.
   */
  disableObjectRender?: boolean;

  /**
   * A callback that is called when the object alignment changes.
   * This is useful when you want to update the object alignment after the object is aligned on the item.
   *
   * @param object The object that was aligned.
   */
  onObjectAlignmentChange?: (object: Object3D) => void;

  /**
   * A callback that is called before the object alignment is applied.
   * This is useful when you want to update the calculated alignment before it is applied.
   *
   * @param alignment The calculated object alignment.
   */
  onBeforeObjectAlignmentApplied?: (alignment: ObjectAlignment) => void;
};
