import React, { useEffect } from "react";
import { usePlacementOnGalleryItem } from "../GalleryItem";
import { Mesh } from "three";
import { ObjectItemProps } from "./ObjectItem.types";
import { TransparentItem } from "react-gallery-3d";

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
