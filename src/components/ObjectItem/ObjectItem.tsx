import React, { useEffect, useRef } from "react";
import { usePlacementOnGalleryItem } from "../GalleryItem";
import { Mesh, Object3D } from "three";
import { ObjectItemProps } from "./ObjectItem.types";
import { TransparentItem } from "react-gallery-3d";

const ObjectRenderer = ({
  object,
  objectProps,
  objectOffset = 0,
}: Pick<ObjectItemProps, "object" | "objectProps" | "objectOffset">) => {
  const objectRef = useRef<Object3D>(null!);
  const { position, orientation } = usePlacementOnGalleryItem(objectOffset);

  useEffect(() => {
    const obj = objectRef.current;
    obj.position.copy(position);
    obj.lookAt(orientation);
  }, [orientation, position]);

  return <primitive ref={objectRef} object={object} {...objectProps} />;
};

export const ObjectItem = React.forwardRef<Mesh, ObjectItemProps>(
  ({ children, object, objectProps, objectOffset, ...rest }, ref) => {
    return (
      <TransparentItem ref={ref} {...rest}>
        <ObjectRenderer object={object} objectProps={objectProps} objectOffset={objectOffset} />

        {children}
      </TransparentItem>
    );
  },
);
