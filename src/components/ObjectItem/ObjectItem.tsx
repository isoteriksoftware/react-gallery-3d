import React, { useEffect } from "react";
import { usePlacementOnGalleryItem } from "../GalleryItem";
import { Mesh } from "three";
import { ObjectItemProps } from "./ObjectItem.types";
import { TransparentItem } from "react-gallery-3d";

/**
 * Renders and aligns the object on the gallery item.
 * This component is used internally by the ObjectItem component.
 *
 * @param object The object to render.
 * @param objectProps The object properties.
 * @param disableObjectRender Whether to disable the object render.
 * @param objectOffset The object offset.
 * @param objectAlignmentOffset The object alignment offset.
 * @param onObjectAlignmentChange The callback to call when the object alignment changes.
 * @param onBeforeObjectAlignmentApplied The callback to call before the object alignment is applied.
 */
const ObjectRenderer = ({
  object,
  objectProps,
  disableObjectRender,
  objectOffset = 0,
  objectAlignmentOffset,
  onObjectAlignmentChange,
  onBeforeObjectAlignmentApplied,
}: Pick<
  ObjectItemProps,
  | "object"
  | "objectProps"
  | "objectOffset"
  | "objectAlignmentOffset"
  | "disableObjectRender"
  | "onObjectAlignmentChange"
  | "onBeforeObjectAlignmentApplied"
>) => {
  const { position, orientation } = usePlacementOnGalleryItem(objectOffset, objectAlignmentOffset);

  useEffect(() => {
    if (object) {
      if (onBeforeObjectAlignmentApplied) {
        onBeforeObjectAlignmentApplied({ position, orientation });
      }

      object.position.copy(position);
      object.lookAt(orientation);

      if (onObjectAlignmentChange) {
        onObjectAlignmentChange(object);
      }
    }
  }, [object, onBeforeObjectAlignmentApplied, onObjectAlignmentChange, orientation, position]);

  if (disableObjectRender || !object) return null;

  return <primitive object={object} {...objectProps} />;
};

/**
 * This component is used to render any three.js object on a gallery item.
 *
 * It is a wrapper around the TransparentItem component.
 *
 * @param object The object to render.
 * @param objectProps The object properties.
 * @param disableObjectRender Whether to disable the object render.
 * @param objectOffset The object offset.
 * @param objectAlignmentOffset The object alignment offset.
 * @param onObjectAlignmentChange The callback to call when the object alignment changes.
 * @param onBeforeObjectAlignmentApplied The callback to call before the object alignment is applied.
 */
export const ObjectItem = React.forwardRef<Mesh, ObjectItemProps>(
  (
    {
      children,
      object,
      objectProps,
      objectOffset,
      disableObjectRender,
      objectAlignmentOffset,
      onObjectAlignmentChange,
      onBeforeObjectAlignmentApplied,
      ...rest
    },
    ref,
  ) => {
    return (
      <TransparentItem ref={ref} {...rest}>
        <ObjectRenderer
          object={object}
          objectProps={objectProps}
          objectOffset={objectOffset}
          objectAlignmentOffset={objectAlignmentOffset}
          disableObjectRender={disableObjectRender}
          onObjectAlignmentChange={onObjectAlignmentChange}
          onBeforeObjectAlignmentApplied={onBeforeObjectAlignmentApplied}
        />

        {children}
      </TransparentItem>
    );
  },
);
