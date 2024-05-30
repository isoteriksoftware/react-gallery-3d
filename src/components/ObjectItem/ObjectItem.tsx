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
}: Pick<ObjectItemProps, "object" | "objectProps" | "objectOffset" | "disableObjectRender">) => {
  const { position, orientation } = usePlacementOnGalleryItem(objectOffset);

  useEffect(() => {
    if (object) {
      object.position.copy(position);
      object.lookAt(orientation);
    }
  }, [object, orientation, position]);

  if (disableObjectRender || !object) return null;

  return <primitive object={object} {...objectProps} />;
};

export const ObjectItem = React.forwardRef<Mesh, ObjectItemProps>(
  ({ children, object, objectProps, objectOffset, disableObjectRender, ...rest }, ref) => {
    return (
      <TransparentItem ref={ref} {...rest}>
        <ObjectRenderer
          object={object}
          objectProps={objectProps}
          objectOffset={objectOffset}
          disableObjectRender={disableObjectRender}
        />

        {children}
      </TransparentItem>
    );
  },
);
