import GalleryItem from "./GalleryItem";
import { Material } from "three";
import { ReactNode } from "react";
import { ViewRenderer, ViewRendererProps } from "./types";

abstract class BaseGalleryItem implements GalleryItem {
  protected readonly viewRenderer?: ViewRenderer;

  protected constructor(viewRenderer?: ViewRenderer) {
    this.viewRenderer = viewRenderer;
  }

  renderView(cylinderProps: ViewRendererProps): ReactNode {
    if (this.viewRenderer) {
      return this.viewRenderer(cylinderProps);
    }

    return null;
  }

  abstract generateMaterial(): Material | Material[];
}

export default BaseGalleryItem;
