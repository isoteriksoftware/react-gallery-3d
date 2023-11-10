import GalleryItem from "./GalleryItem";
import { Material } from "three";
import { ReactNode } from "react";
import { ViewRenderer, ViewRendererParams } from "./types";

abstract class BaseGalleryItem implements GalleryItem {
  protected readonly viewRenderer?: ViewRenderer;

  protected constructor(viewRenderer?: ViewRenderer) {
    this.viewRenderer = viewRenderer;
  }

  renderView(viewRendererParams: ViewRendererParams): ReactNode {
    if (this.viewRenderer) {
      return this.viewRenderer(viewRendererParams);
    }

    return null;
  }

  abstract generateMaterial(): Material | Material[];
}

export default BaseGalleryItem;
