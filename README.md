![Preview](https://github.com/isoteriksoftware/react-gallery-3d/assets/50753501/109d9120-07f0-46fd-b43e-21a127979e25)

[![Version](https://img.shields.io/npm/v/react-gallery-3d)](https://www.npmjs.com/package/react-gallery-3d)
[![Downloads](https://img.shields.io/npm/dt/react-gallery-3d.svg)](https://www.npmjs.com/package/react-gallery-3d)

`react-gallery-3d` provides React components to create awesome 3D galleries. 
It supports rendering with solid colors, images, videos, etc., offering a wide range of possibilities for showcasing media in a 3D environment.
Version 2 introduces exciting new features and optimizations to enhance your gallery-building experience.

## New Features
- **Transparent Items**: Gallery items can now be transparent, allowing you to create more complex and visually appealing galleries.
- **Object Items**: You can now use custom three.js objects as gallery items, giving you more control over the appearance and behavior of your gallery.
- **New Item Material API**: The item material API has been redesigned to make it easier to create and reuse custom materials for gallery items. Full control over the material properties is now possible.
- **Support for Deeply Nested Gallery Items**: With v2.2.x, Gallery Items can now be rendered deep within the component tree, allowing for more complex and dynamic galleries.
- **Support for Gallery with less than 3 items**: You can now render galleries with less than three items. This allows you to create galleries with one or two items.
- **Support for Gallery Item Props Overrides**: You can now override the gallery item properties for individual items, allowing you to create galleries with items of different sizes and configuration.
- **Improved Performance**: The library has been optimized to improve performance and reduce memory usage, making it faster and more efficient.

## Demo
Check out the [live demo (playground)](https://react-gallery-3d-demo.vercel.app/) to see `react-gallery-3d` in action and explore its capabilities.

## Table of Contents
<!-- TOC -->
  * [New Features](#new-features)
  * [Demo](#demo)
  * [Table of Contents](#table-of-contents)
  * [Installation](#installation)
  * [Peer Dependencies](#peer-dependencies)
  * [Basic Usage](#basic-usage)
  * [Advanced Usage](#advanced-usage)
  * [Components](#components)
    * [`<GalleryScene/>`](#galleryscene)
      * [Props](#props)
      * [Example Usage](#example-usage)
    * [`<Gallery/>`](#gallery)
      * [Props](#props-1)
      * [Example Usage](#example-usage-1)
    * [`<GalleryItem/>`](#galleryitem)
      * [Props](#props-2)
      * [Example Usage](#example-usage-2)
    * [`<SolidColorItem/>`](#solidcoloritem)
      * [Props](#props-3)
      * [Example Usage](#example-usage-3)
    * [`<ImageItem/>`](#imageitem)
      * [Props](#props-4)
      * [Example Usage](#example-usage-4)
    * [`<VideoItem/>`](#videoitem)
      * [Props](#props-5)
      * [Example Usage](#example-usage-5)
    * [`<TransparentItem/>`](#transparentitem)
      * [Props](#props-6)
      * [Example Usage](#example-usage-6)
    * [`<ObjectItem/>`](#objectitem)
      * [Props](#props-7)
      * [Example Usage](#example-usage-7)
  * [Hooks](#hooks)
    * [`useGalleryItem()`](#usegalleryitem)
      * [Example Usage](#example-usage-8)
    * [`usePlacementOnGalleryItem()`](#useplacementongalleryitem)
    * [`useImageMaterial()`](#useimagematerial)
      * [Example Usage](#example-usage-9)
    * [`useVideoMaterial()`](#usevideomaterial)
      * [Example Usage](#example-usage-10)
  * [Breaking Changes](#breaking-changes)
  * [Migration Guide](#migration-guide)
    * [GalleryItem Material API](#galleryitem-material-api)
      * [Before](#before)
      * [Now](#now)
    * [GalleryItemMaterial Implementations](#galleryitemmaterial-implementations)
      * [Before](#before-1)
      * [Now](#now-1)
    * [Gallery Ground API](#gallery-ground-api)
      * [Before](#before-2)
      * [Now](#now-2)
    * [Gallery Children](#gallery-children)
      * [Before](#before-3)
      * [Now](#now-3)
    * [GalleryItem Properties](#galleryitem-properties)
      * [Before](#before-4)
      * [Now](#now-4)
  * [Contributing](#contributing)
<!-- TOC -->

## Installation
```bash
npm install react-gallery-3d three @react-three/fiber @react-three/drei
```
or
```bash
yarn add react-gallery-3d three @react-three/fiber @react-three/drei
```

## Peer Dependencies
This library is designed to work alongside `@react-three/drei`, `@react-three/fiber`, and `three.js`. These are listed as peer dependencies, meaning that it expects these packages to be present in your project:

- `three.js`: A JavaScript 3D library that creates and displays animated 3D computer graphics in a web browser.
- `@react-three/fiber`: A React renderer for three.js that brings declarative, reactive, and component-based patterns to 3D rendering.
- `@react-three/drei`: A useful collection of helpers and abstractions for react-three-fiber.

As peer dependencies, they are not automatically installed when you install this library. You need to manually install them in your project, if not already present. This approach helps to avoid version conflicts and reduce bundle size.

## Basic Usage
```tsx
import { Gallery, GalleryScene, ImageItem, SolidColorItem, VideoItem } from "react-gallery-3d";

function App() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene>
        <Gallery>
          <ImageItem src="https://picsum.photos/1280/720" />
          <SolidColorItem color="teal" />
          <VideoItem
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            crossOrigin="anonymous"
          />
        </Gallery>
      </GalleryScene>
    </main>
  );
}

export default App;
```

This renders a gallery with three items: a solid color, an image, and a video. The gallery is rendered in a canvas element using `react-three-fiber`.

![Basic Gallery](https://github.com/isoteriksoftware/react-gallery-3d/assets/50753501/62ce17c0-e097-45ba-bf65-08d8697752ba)

> **Note** <br/>
> You may see a different image when you run the code because the image is fetched from an external source (picsum). The image may change each time you reload the page.

## Advanced Usage
You can create more complex galleries by customizing the gallery items and their materials. 
The following example demonstrates how to create a gallery with transparent items, custom materials, and models:

```tsx
import {
  Gallery,
  GalleryScene,
  ImageItem,
  VideoItem,
  TransparentItem,
  ObjectItem,
} from "react-gallery-3d";
import { useState } from "react";
import { Mesh } from "three";
import { useGLTF } from "@react-three/drei";

function App() {
  const [box, setBox] = useState<Mesh | null>(null);
  const { scene: model } = useGLTF("/models/low_poly_character_swordsman.glb");
  const [itemHeight] = useState(60);

  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene
        orbitControls={{
          autoRotate: true,
          rotateSpeed: -1,
          enableZoom: false,
        }}
        environment={{
          preset: "city",
        }}
        camera={{
          position: [0, 60, 150],
          fov: 45,
        }}
        fog={{
          color: "black",
          near: 10,
          far: 520,
        }}
        ground={{
          position: [0, -itemHeight / 2, 0],
          reflectorMaterial: {
            mirror: 0.95,
            resolution: 2048,
            roughness: 1,
            metalness: 0.7,
          },
        }}
      >
        <Gallery
          item={{
            width: 150,
            height: itemHeight,
            radialSegments: 50,
            innerRadiusPercent: 0.01,
          }}
        >
          <TransparentItem />
          <VideoItem src="/videos/vid6.mp4" />
          <ImageItem src="/images/img1.jpg" />
          <VideoItem src="/videos/vid4.mp4" />
          <ImageItem src="/images/img2.jpg" />
          <ObjectItem object={box} objectOffset={0} disableObjectRender>
            <mesh ref={(boxObj) => setBox(boxObj)}>
              <boxGeometry args={[10, 10, 10]} />
              <meshStandardMaterial color="white" />
            </mesh>
          </ObjectItem>
          <ObjectItem
            object={model}
            objectProps={{
              scale: [20, 20, 20],
            }}
            onObjectAlignmentChange={(object) => {
              object.position.y = -itemHeight / 2;
              object.rotateY(Math.PI);
            }}
          />
        </Gallery>
      </GalleryScene>
    </main>
  );
}

export default App;
```

![Advanced Gallery](https://github.com/isoteriksoftware/react-gallery-3d/assets/50753501/41dbae3b-cba5-42c2-9b20-778ab9c76115)

> **Note** <br/>
> The example uses a 3D model from the [low-poly-character-swordsman](https://sketchfab.com/3d-models/low-poly-character-swordsman-24aae01ca3a64a8c9dfc232840c2542b) collection on Sketchfab. 
> The model, images, and videos are included in the `public` folder of the project.

## Components

### `<GalleryScene/>`
The `GalleryScene` is a wrapper around the `Canvas` component from `@react-three/fiber`. 
It sets up the 3D environment, camera, lighting, fog, and controls for galleries. 
It also provides a ground plane with a reflector material for realistic reflections.

This component can render galleries and other 3D objects.
You can customize the scene by passing props to the `GalleryScene` component.

#### Props
```tsx
type GallerySceneProps = Omit<CanvasProps, "children"> & {
  /**
   * The children to render.
   *
   * @default undefined
   */
  children?: ReactNode;

  /**
   * The background color of the scene.
   *
   * @default #000000
   */
  backgroundColor?: ColorRepresentation;

  /**
   * The Fog properties
   *
   * @default {
   *   color: "#000000",
   *   near: 10,
   *   far: 400
   * }
   */
  fog?: FogProps;

  /**
   * The OrbitControls properties.
   *
   * @default {
   *   enableDamping: true,
   *   enableZoom: true,
   *   dampingFactor: 0.01,
   *   autoRotate: true,
   *   autoRotateSpeed: -1
   * }
   */
  orbitControls?: OrbitControlsProps;

  /**
   * Whether to disable the controls.
   *
   * @default false
   */
  disableControls?: boolean;

  /**
   * Whether to disable the fog.
   *
   * @default false
   */
  disableFog?: boolean;

  /**
   * Whether to disable the environment.
   *
   * @default false
   */
  disableEnvironment?: boolean;

  /**
   * The Environment properties.
   *
   * @default {
   *   preset: "sunset"
   * }
   */
  environment?: EnvironmentProps;

  /**
   * The Ground properties.
   *
   * @default {
   *   position: [0, -25, 0]
   * }
   */
  ground?: GroundProps;

  /**
   * Whether to disable the ground.
   *
   * @default false
   */
  disableGround?: boolean;

  /**
   * The fallback to render while loading the scene.
   */
  suspenseFallback?: ReactNode;
};
```

#### Example Usage
```tsx
<GalleryScene
  backgroundColor="#000000"
  fog={{
    color: "#000000",
    near: 10,
    far: 400,
  }}
  orbitControls={{
    enableDamping: true,
    enableZoom: true,
    dampingFactor: 0.01,
    autoRotate: true,
    autoRotateSpeed: -1,
  }}
  disableControls={false}
  disableFog={false}
  disableEnvironment={false}
  environment={{
    preset: "sunset",
  }}
  ground={{
    position: [0, -25, 0],
  }}
  disableGround={false}
>
  <Gallery>
    {/* Gallery items */}
  </Gallery>

  <Gallery position-x={160}>
    {/* Gallery items */}
  </Gallery>

  {/* Other 3D objects */}
</GalleryScene>
```

<br/>

### `<Gallery/>`
The `Gallery` component is a container for gallery items. It arranges the items in a cylindrical layout around the center of the scene.
It requires at least three items to render.

All children of the `Gallery` component must be `GalleryItem` or its subclasses (e.g., `ImageItem`, `VideoItem`, `SolidColorItem`, etc.).
Unknown children will be ignored.

It accepts global props to customize the appearance and layout of the gallery items.

#### Props
```tsx
type GalleryProps = Omit<GroupProps, "children" | "ref"> & {
  /**
   * The children of the gallery.
   */
  children: GalleryChildren;

  /**
   * The global properties for all the items in the gallery.
   *
   * These properties are used when the gallery item properties are not provided.
   */
  item?: {
    /**
     * The width of the gallery item.
     *
     * @default 120
     */
    width?: number;

    /**
     * The height of the gallery item.
     *
     * @default 50
     */
    height?: number;

    /**
     * The number of radial segments.
     *
     * @default 50
     */
    radialSegments?: number;

    /**
     * The number of height segments.
     *
     * @default 1
     */
    heightSegments?: number;

    /**
     * The percentage of the outer radius to use as the inner radius.
     *
     * @default 0.01
     */
    innerRadiusPercent?: number;

    /**
     * The section angle of the gallery item.
     *
     * This property is calculated using the total number of items in the gallery when not provided.
     */
    sectionAngle?: number;
  };
};
```

#### Example Usage
```tsx
<Gallery
  item={{
    width: 120,
    height: 50,
    radialSegments: 50,
    heightSegments: 1,
    innerRadiusPercent: 0.01,
  }}
>
  {/* Gallery items */}
</Gallery>
```

<br/>

### `<GalleryItem/>`
The `GalleryItem` component is the base component for gallery items. It provides a common interface for all gallery items.
This can be used to create custom gallery items.

Any 3D object can be a child of the `GalleryItem` component. 
Children objects can be positioned and aligned correctly using `ObjectItem` or using the `usePlacementOnGalleryItem` hook
for more control over the placement of the object.

The component has a `material` prop that accepts a material or an array of materials to apply to the gallery item.
This allows you to customize the appearance of the gallery item.

#### Props
```tsx
type GalleryItemProps = MeshProps & {
  /**
   * The material to apply to the gallery item.
   */
  material: Material | Material[];

  /**
   * The width of the gallery item.
   *
   * When not provided, the value is taken from the Gallery item properties.
   */
  width?: number;

  /**
   * The height of the gallery item.
   *
   * When not provided, the value is taken from the Gallery item properties.
   */
  height?: number;

  /**
   * The number of radial segments.
   *
   * When not provided, the value is taken from the Gallery item properties.
   */
  radialSegments?: number;

  /**
   * The number of height segments.
   *
   * When not provided, the value is taken from the Gallery item properties.
   */
  heightSegments?: number;

  /**
   * The percentage of the outer radius to use as the inner radius.
   *
   * When not provided, the value is taken from the Gallery item properties.
   */
  innerRadiusPercent?: number;

  /**
   * The section angle of the gallery item.
   *
   * When not provided, the value is taken from the Gallery item properties.
   */
  sectionAngle?: number;
};
```

#### Example Usage
```tsx
import { Gallery, GalleryItem, GalleryScene } from "react-gallery-3d";
import { useMemo, useState } from "react";
import { MathUtils, MeshStandardMaterial } from "three";

function App() {
  const [rotation] = useState(MathUtils.degToRad(10));

  const greenMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "green",
        emissive: "red",
        roughness: 0.5,
        metalness: 1,
      }),
    [],
  );

  const redMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "red",
        emissive: "blue",
        roughness: 0.5,
        metalness: 1,
      }),
    [],
  );

  const blueMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "blue",
        emissive: "green",
        roughness: 0.5,
        metalness: 1,
      }),
    [],
  );

  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene
        ground={{
          reflectorMaterial: {
            metalness: 1,
            roughness: 1,
            mirror: 1,
            resolution: 2048,
          },
        }}
      >
        <Gallery>
          <GalleryItem
            material={greenMaterial}
            sectionAngle={Math.PI / 4}
            position-z={10}
            rotation-z={rotation}
          />
          <GalleryItem
            material={greenMaterial}
            sectionAngle={Math.PI / 2}
            position-z={10}
          />
          <GalleryItem
            material={redMaterial}
            rotation-z={rotation}
            onPointerOver={() => console.log("Item Hovered!")}
          />
          <GalleryItem
            material={blueMaterial}
            rotation-z={rotation}
            onClick={() => console.log("Item Clicked!")}
          />
        </Gallery>
      </GalleryScene>
    </main>
  );
}

export default App;
```
![Example Output](https://github.com/isoteriksoftware/react-gallery-3d/assets/50753501/715871eb-1bb8-4d81-992a-32947448370b)
 
<br/>

### `<SolidColorItem/>`
The `SolidColorItem` component renders a gallery item with a solid color material.
It accepts a `color` prop to specify the color of the item.

This component is useful for creating simple gallery items with solid colors.
It does not require any additional setup or configuration.
If you need more control over the appearance of the gallery item, you can use the `GalleryItem` component with a custom material.

#### Props
```tsx
type SolidColorItemProps = Omit<GalleryItemProps, "material"> & {
  /**
   * The color of the solid color item.
   */
  color: ColorRepresentation;
};
```

#### Example Usage
```tsx
import { Gallery, GalleryScene, SolidColorItem } from "react-gallery-3d";

function App() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene>
        <Gallery>
          <SolidColorItem color="red" />
          <SolidColorItem color="green" />
          <SolidColorItem color="blue" />
          <SolidColorItem color="yellow" />
          <SolidColorItem color="purple" />
          <SolidColorItem color="orange" />
        </Gallery>
      </GalleryScene>
    </main>
  );
}

export default App;
```
![Example Output](https://github.com/isoteriksoftware/react-gallery-3d/assets/50753501/60ce4990-b031-416b-a11c-0c608163e7a7)

<br/>

### `<ImageItem/>`
The `ImageItem` component renders a gallery item with an image (texture) mapped to a material.
This component is useful for creating gallery items with images.

It accepts a `texture` for providing a custom texture for the item.
It also accepts a `src` prop for specifying the URL of the image to use as the texture.

Using the `texture` prop is recommended for better performance and control over how the texture is loaded (using `useTexture` from `@react-three/drei` for example).

One of `src` or `texture` must be provided to render the image.

#### Props
```tsx
type ImageItemProps = Omit<GalleryItemProps, "material"> & {
  /**
   * The image source.
   * If a texture is provided, this will be ignored.
   */
  src?: string;

  /**
   * The texture to use.
   * If provided, the src will be ignored.
   */
  texture?: Texture;

  /**
   * The material to use.
   * If not provided, a new MeshStandardMaterial will be created.
   */
  material?: MappableMaterial;
};
```

#### Example Usage
```tsx
import { Gallery, GalleryScene, ImageItem } from "react-gallery-3d";
import { useTexture } from "@react-three/drei";

function MyGallery() {
  const textures = useTexture([
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
    "/images/img6.jpg",
  ]);

  return (
    <Gallery>
      {textures.map((texture, index) => (
        <ImageItem key={index} texture={texture} />
      ))}
    </Gallery>
  );
}

function App() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene
        environment={{
          preset: "city",
        }}
      >
        <MyGallery />
      </GalleryScene>
    </main>
  );
}

export default App;
```
![Example Output](https://github.com/isoteriksoftware/react-gallery-3d/assets/50753501/748e3e2c-c044-4a24-ad1a-edc06e5ffe5a)

> **Note** <br/>
> - The images are included in the `public` folder of the project.
> - `useTexture` is used to load the images as textures for better performance.
> - `useTexture` must be called in a component that is a child of the `Canvas` component from `@react-three/fiber`.
> - The  `GalleryScene` component is a wrapper around the `Canvas` component.

<br/>

### `<VideoItem/>`
The `VideoItem` component renders a gallery item with a video texture mapped to a material.
This component is useful for creating gallery items with videos.

It accepts a `src` prop for specifying the URL of the video to use as the texture.
It also accepts props to control the video playback, such as `autoplay`, `muted`, and `loop`.

When `autoplay` is set to `true`, the video will be muted by default. 
This is a requirement for autoplaying videos in most browsers.

#### Props
```tsx
type VideoItemProps = Omit<GalleryItemProps, "material"> & {
  /**
   * The video source.
   */
  src: string;

  /**
   * Whether to autoplay the video.
   *
   * If this is set to true, the video will be muted.
   *
   * @default true
   */
  autoplay?: boolean;

  /**
   * Whether to mute the video.
   *
   * @default true
   */
  muted?: boolean;

  /**
   * Whether to loop the video.
   *
   * @default true
   */
  loop?: boolean;

  /**
   * The cross-origin attribute for the video.
   */
  crossOrigin?: JSX.IntrinsicElements["video"]["crossOrigin"];

  /**
   * A callback that is called when the video is initialized.
   * This is useful for getting references to the video and texture.
   *
   * @param video the video element
   * @param texture the video texture
   */
  onInit?: (video: HTMLVideoElement, texture: VideoTexture) => void;

  /**
   * The material to use for the video.
   *
   * If not provided, a new MeshStandardMaterial will be created.
   */
  material?: MappableMaterial;
};
```

#### Example Usage
```tsx
import { Gallery, GalleryScene, VideoItem } from "react-gallery-3d";

function App() {
  const videos = [
    "/videos/vid1.mp4",
    "/videos/vid2.mp4",
    "/videos/vid3.mp4",
    "/videos/vid4.mp4",
    "/videos/vid5.mp4",
    "/videos/vid6.mp4",
  ];

  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene
        environment={{
          preset: "city",
        }}
        fog={{
          far: 500,
        }}
      >
        <Gallery>
          {videos.map((video) => (
            <VideoItem key={video} src={video} />
          ))}
        </Gallery>
      </GalleryScene>
    </main>
  );
}

export default App;
```
![Example Output](https://github.com/isoteriksoftware/react-gallery-3d/assets/50753501/8985944f-48df-4f5e-8f69-c5ea64e4f915)

> **Note** <br/>
> The videos are included in the `public` folder of the project.

<br/>

### `<TransparentItem/>`
The `TransparentItem` component renders a gallery item with a transparent material.
This component is useful for creating gallery items with transparent background.

It is not very useful on its own, but can be combined with other components to create more complex galleries.

#### Props
```tsx
type TransparentItemProps = Omit<GalleryItemProps, "material"> & {
  /**
   * The opacity of the item.
   *
   * @default 0
   */
  opacity?: number;
};
```

#### Example Usage
```tsx
import {
  Gallery,
  GalleryScene,
  ImageItem,
  SolidColorItem,
  VideoItem,
  TransparentItem,
  usePlacementOnGalleryItem,
} from "react-gallery-3d";
import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";

function GalleryItemBox() {
  const [size] = useState(10);
  const boxRef = useRef<Mesh>(null!);
  const { position, orientation } = usePlacementOnGalleryItem(size / 2);

  useEffect(() => {
    const box = boxRef.current;
    box.position.copy(position);
    box.lookAt(orientation);
  }, [orientation, position]);

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function App() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene>
        <Gallery>
          <ImageItem src="https://picsum.photos/1280/720" />

          <SolidColorItem color="teal" />

          <TransparentItem />

          <VideoItem
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            crossOrigin="anonymous"
          />

          <TransparentItem>
            <GalleryItemBox />
          </TransparentItem>
        </Gallery>
      </GalleryScene>
    </main>
  );
}

export default App;
```
![Example Output](https://github.com/isoteriksoftware/react-gallery-3d/assets/50753501/de1200c1-8077-4330-88b7-584df8e6373e)

> **Note** <br/>
> - The image is fetched from an external source (picsum). The image may change each time you reload the page.
> - The `GalleryItemBox` uses the `usePlacementOnGalleryItem` hook to position the box on the gallery item.

<br/>

### `<ObjectItem/>`
The `ObjectItem` component renders a gallery item with a custom three.js object.
This component is useful for creating gallery items with custom 3D objects.

It accepts an `object` prop for specifying the custom object to render.
By default, the `object` will be rendered by the component. This is useful for rendering instances of models, meshes, etc.

If you want to control the rendering of the object, set the `disableObjectRender` prop to `true`. 
This will automatically align the object on the gallery item surface using the `usePlacementOnGalleryItem` hook
but will not render the object.

When `disableObjectRender` is set to `true`, the component will not pass the `objectProps` prop to the object.
This allows you to render the object yourself and have full control over its appearance and behavior.

This component makes it very easy render models on gallery items.
It can also be used to automatically place an object on a gallery item.

#### Props
```tsx
type ObjectItemProps = TransparentItemProps & {
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
```

#### Example Usage
```tsx
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import {
  Gallery,
  GalleryScene,
  ObjectItem,
  SolidColorItem,
} from "react-gallery-3d";
import { Mesh } from "three";

function BellyDancer() {
  const { scene: model, animations } = useGLTF("/models/belly-dancer.glb");
  const { ref, actions } = useAnimations(animations, model);

  useEffect(() => {
    if (actions) {
      actions["Armature|mixamo.com|Layer0"]?.play();
    }
  }, [actions]);

  return (
    <ObjectItem
      object={model}
      disableObjectRender
      onObjectAlignmentChange={(object) => {
        object.position.y = -25;
      }}
    >
      <primitive ref={ref} object={model} scale={[0.5, 0.5, 0.5]} />
    </ObjectItem>
  );
}

function App() {
  const [box, setBox] = useState<Mesh | null>(null);
  const { scene: model } = useGLTF("/models/low_poly_character_swordsman.glb");

  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene>
        <Gallery>
          <ObjectItem object={box} objectOffset={0} disableObjectRender>
            <mesh ref={(boxObj) => setBox(boxObj)}>
              <boxGeometry args={[10, 10, 10]} />
              <meshStandardMaterial color="white" />
            </mesh>
          </ObjectItem>

          <SolidColorItem color="blue" />

          <ObjectItem
            object={model}
            objectProps={{
              scale: [20, 20, 20],
            }}
            onObjectAlignmentChange={(object) => {
              object.position.y = -25;
              object.rotateY(Math.PI);
            }}
          />

          <SolidColorItem color="green" />

          <BellyDancer />
        </Gallery>
      </GalleryScene>
    </main>
  );
}

export default App;
```
![Example Output](https://github.com/isoteriksoftware/react-gallery-3d/assets/50753501/d03222d7-4d2a-46a2-b43f-3c228b0791ea)

> **Note** <br/>
> - The models are included in the `public` folder of the project.
> - The `BellyDancer` component uses the `useAnimations` and `useGLTF` hooks from `@react-three/drei` to load and animate the model.

<br/>

## Hooks

### `useGalleryItem()`
The `useGalleryItem` hook provides access to the `GalleryItemContext`, allowing you to access the gallery items properties.

This hook is useful when you need to access the gallery item properties in a child component of the `GalleryItem` component.
It returns a `UseGalleryReturnType` object that contains the gallery item properties.

```tsx
type UseGalleryItemReturnType = GalleryItemState & {
  /**
   * The total number of items in the gallery.
   */
  itemCount: number;
};

type GalleryItemState = {
  /**
   * The width of the gallery item.
   */
  width: number;

  /**
   * The height of the gallery item.
   */
  height: number;

  /**
   * The number of radial segments.
   */
  radialSegments: number;

  /**
   * The number of height segments.
   */
  heightSegments: number;

  /**
   * The percentage of the outer radius to use as the inner radius.
   */
  innerRadiusPercent: number;

  /**
   * The angle of the section of the gallery item.
   * This is used to calculate the position of the gallery item.
   */
  sectionAngle: number;

  /**
   * The radius of the gallery item.
   */
  outerRadius: number;

  /**
   * The inner radius of the gallery item.
   */
  innerRadius: number;

  /**
   * The index of the gallery item.
   */
  itemIndex: number;
};
```

#### Example Usage
```tsx
import {
  Gallery,
  GalleryScene,
  SolidColorItem,
  useGalleryItem,
  usePlacementOnGalleryItem,
} from "react-gallery-3d";
import { Text } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { MathUtils, Mesh } from "three";

function ItemLabel() {
  const { itemIndex } = useGalleryItem();
  const textRef = useRef<Mesh | null>(null);
  const { position, orientation } = usePlacementOnGalleryItem(5);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    text.position.copy(position);
    text.lookAt(orientation);
    text.rotateY(MathUtils.degToRad(180));
  }, [orientation, position]);

  return (
    <Text ref={textRef} fontSize={6} color="white" textAlign="center">
      ITEM {itemIndex + 1}
    </Text>
  );
}

function App() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene>
        <Gallery>
          <SolidColorItem color="red">
            <ItemLabel />
          </SolidColorItem>

          <SolidColorItem color="green">
            <ItemLabel />
          </SolidColorItem>

          <SolidColorItem color="blue">
            <ItemLabel />
          </SolidColorItem>

          <SolidColorItem color="yellow">
            <ItemLabel />
          </SolidColorItem>
        </Gallery>
      </GalleryScene>
    </main>
  );
}

export default App;
```
![Example Result](https://github.com/isoteriksoftware/react-gallery-3d/assets/50753501/2a67c825-2d61-475a-a0f7-fb0c244714fa)

> **Hints** <br/>
> - The `ItemLabel` component uses the `useGallery` hook to access the gallery item properties.
> - The `usePlacementOnGalleryItem` hook is used to position the text on the gallery item surface.

<br/>

### `usePlacementOnGalleryItem()`
The `usePlacementOnGalleryItem` hook calculates the values required to place an object on a gallery item surface.

You can pass an `objectOffset` to specify the offset of the object from the center of the gallery item.

You can also pass `itemAlignmentOffset` to adjust the alignment of the object on the gallery item surface.
This will be calculated automatically if you do not provide one.

It returns an `ObjectAlignment` object that contains the position and orientation of the object:

```tsx
type ObjectAlignment = {
  /**
   * The calculated position for the object.
   */
  position: Vector3;

  /**
   * The calculated orientation for the object.
   */
  orientation: Vector3;
};
```

> **Hint** <br/>
> Check how the `usePlacementOnGalleryItem` hook in the previous example.

<br/>

### `useImageMaterial()`
The `useImageMaterial` hook creates a material mapped to an image texture.
It is useful for creating custom materials for gallery items with images.

An existing material can be wrapped using the wrappedMaterial prop.
This allows you to create a custom material and use the image texture as the map property.

If no wrappedMaterial is provided, a new `MeshStandardMaterial` is created.

If a texture is provided, it is used instead of loading the source:
```tsx
type UseImageMaterialOptions = {
  /**
   * The image source.
   * If a texture is provided, this will be ignored.
   */
  src?: string;

  /**
   * The texture to use.
   * If provided, the src will be ignored.
   */
  texture?: Texture;

  /**
   * The wrapped material.
   * If not provided, a new MeshStandardMaterial will be created.
   */
  wrappedMaterial?: MappableMaterial;
};
```

The hook returns a `UseImageMaterialReturnType` object that contains the material and texture:

```tsx
type UseImageMaterialReturnType = {
  /**
   * The texture for the image.
   */
  texture: Texture;

  /**
   * The material for the image.
   */
  material: MappableMaterial;
};
```

#### Example Usage
```tsx
import {
  Gallery,
  GalleryScene,
  GalleryItem,
  ImageItemProps,
  useImageMaterial,
} from "react-gallery-3d";
import { useMemo } from "react";
import { MeshPhysicalMaterial } from "three";

function GlassImageItem({ src, texture, children }: ImageItemProps) {
  const material = useMemo(() => {
    return new MeshPhysicalMaterial({
      toneMapped: true,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      metalness: 0,
      roughness: 0,
      transmission: 0.2,
      clearcoat: 0.1,
      transparent: true,
      opacity: 0.7,
    });
  }, []);

  const { material: finalMaterial } = useImageMaterial({
    src,
    texture,
    wrappedMaterial: material,
  });

  return <GalleryItem material={finalMaterial}>{children}</GalleryItem>;
}

function App() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene
        ground={{
          reflectorMaterial: {
            metalness: 1,
            roughness: 0.9,
            mirror: 1,
            resolution: 2048,
          },
        }}
        environment={{
          preset: "city",
        }}
      >
        <Gallery>
          <GlassImageItem src="/images/img4.jpg" />
          <GlassImageItem src="/images/img5.jpg" />
          <GlassImageItem src="/images/img6.jpg" />
          <GlassImageItem src="/images/img1.jpg" />
          <GlassImageItem src="/images/img2.jpg" />
          <GlassImageItem src="/images/img3.jpg" />
        </Gallery>
      </GalleryScene>
    </main>
  );
}

export default App;
```
![Example Output](https://github.com/isoteriksoftware/react-gallery-3d/assets/50753501/11d0bab0-997a-4e4f-b970-6513443d1850)

<br/>

### `useVideoMaterial()`
The `useVideoMaterial` hook creates a material mapped to a video texture.
It is useful for creating custom materials for gallery items with videos.

An existing material can be wrapped using the wrappedMaterial prop.
This allows you to create a custom material and use the video texture as the map property.

If no wrappedMaterial is provided, a new `MeshStandardMaterial` is created:
```tsx
type UseVideoMaterialOptions = {
  /**
   * The video source.
   */
  src: string;

  /**
   * The wrapped material.
   *
   * If not provided, a new MeshStandardMaterial will be created.
   */
  wrappedMaterial?: MappableMaterial;

  /**
   * Whether to autoplay the video.
   *
   * If this is set to true, the video will be muted.
   *
   * @default true
   */
  autoplay?: boolean;

  /**
   * Whether to mute the video.
   *
   * @default true
   */
  muted?: boolean;

  /**
   * Whether to loop the video.
   *
   * @default true
   */
  loop?: boolean;

  /**
   * The cross-origin attribute for the video.
   */
  crossOrigin?: JSX.IntrinsicElements["video"]["crossOrigin"];
};
```

The hook returns a `UseVideoMaterialReturnType` object that contains the material, video texture, and video element:
```tsx
type UseVideoMaterialReturnType = {
  /**
   * The video element.
   */
  video: HTMLVideoElement;

  /**
   * The video texture.
   */
  texture: VideoTexture;

  /**
   * The material.
   */
  material: MappableMaterial;
};
```

#### Example Usage
```tsx
import {
  Gallery,
  GalleryScene,
  GalleryItem,
  VideoItemProps,
  useVideoMaterial,
} from "react-gallery-3d";
import { useMemo } from "react";
import { MeshPhysicalMaterial } from "three";

function ShinyVideoItem({ children, ...rest }: VideoItemProps) {
  const material = useMemo(() => {
    return new MeshPhysicalMaterial({
      toneMapped: true,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      reflectivity: 1,
      metalness: 1,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      emissive: "#430909",
    });
  }, []);

  const { material: finalMaterial } = useVideoMaterial({
    ...rest,
    wrappedMaterial: material,
  });

  return <GalleryItem material={finalMaterial}>{children}</GalleryItem>;
}

function App() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene
        ground={{
          reflectorMaterial: {
            metalness: 1,
            roughness: 0.9,
            mirror: 1,
            resolution: 2048,
          },
        }}
        environment={{
          preset: "sunset",
        }}
      >
        <Gallery>
          <ShinyVideoItem src="/videos/vid4.mp4" />
          <ShinyVideoItem src="/videos/vid5.mp4" />
          <ShinyVideoItem src="/videos/vid6.mp4" />
          <ShinyVideoItem src="/videos/vid1.mp4" />
          <ShinyVideoItem src="/videos/vid2.mp4" />
          <ShinyVideoItem src="/videos/vid3.mp4" />
        </Gallery>
      </GalleryScene>
    </main>
  );
}

export default App;
```
![Example Output](https://github.com/isoteriksoftware/react-gallery-3d/assets/50753501/13b31329-0aaa-4e5e-bbde-dbc3adf9820c)

<br/>

## Breaking Changes
Version 2.x.x introduces breaking changes to the API.

The biggest change is on the material generation API. 
The library now gives you more control over how and when materials are generated and reused across gallery items.

Please review the following changes carefully to update your code accordingly:
- The `GalleryItem` component now requires a `material` prop to specify the material for the gallery item. Previously, the material was created internally using a generator function `itemMaterial` prop. This prop is no longer supported.
- `GalleryItemMaterial` and its subclasses are no longer available. You should use the `GalleryItem` component with a custom material instead.
- The `Gallery` component no longer accepts props for managing a `Ground` component. The `Ground` component is now managed internally by the `GalleryScene` component. All the props for the `Ground` are now available in the `GalleryScene` component.
- The `Gallery` component no longer limits its children to only supported types. This means it will render all of its children unlike in previous versions where unknown children are ignored.
- `useGallery()` hook is no longer available. You should use the `useGalleryItem()` hook to access the gallery item properties.


## Migration Guide
This guide will help you migrate from version 1.x.x to version 2.x.x of the library.

### GalleryItem Material API
In version 1.x.x, the `GalleryItem` component generated the material internally using the `itemMaterial` prop.
This was a convenient way to create materials for gallery items without having to manage them manually.

In version 2.x.x, the `GalleryItem` component requires a `material` prop to specify the material for the gallery item.
This gives you more control over how and when materials are created and reused across gallery items.

#### Before
```tsx
class ShinyRedMaterial implements GalleryItemMaterial {
  public generate() {
    return new MeshPhysicalMaterial({
      color: 'red',
      reflectivity: 1,
      metalness: 1,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
  }
}

function App() {
  const shinyRedMaterialGenerator = useMemo(() => new ShinyRedMaterial(), []);
  const [shinyRedMaterial, setShinyRedMaterial] = useState<MeshPhysicalMaterial>();

  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene>
        <Gallery>
          <GalleryItem
            itemMaterial={shinyRedMaterialGenerator}
            onInit={({ material }) => setShinyRedMaterial(material as MeshPhysicalMaterial)}
          />

          {/* Other items... */}
        </Gallery>
      </GalleryScene>
    </main>
  );
}
```

#### Now
```tsx
function App() {
  const shinyRedMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: "red",
        reflectivity: 1,
        metalness: 1,
        roughness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }),
    [],
  );

  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene>
        <Gallery>
          <GalleryItem material={shinyRedMaterial} />

          {/* Other items... */}
        </Gallery>
      </GalleryScene>
    </main>
  );
}
```

<br/>

### GalleryItemMaterial Implementations
In version 1.x.x, the library provided `GalleryItemMaterial` and its 
implementations (`ImageItemMaterial`, `SolidColorItemMaterial`, and `VideoItemMaterial`) to create materials for gallery items.

These implementations are no longer available in version 2.x.x.
You should use the `GalleryItem` component with a custom material or use new hooks like `useImageMaterial()` and 
`useVideoMaterial()` to create materials for gallery items.

#### Before
```tsx
class GlassyImageMaterial extends ImageItemMaterial {
  constructor() {
    super("/images/img1.jpg");
  }

  public generate() {
    this.initTexture();

    return new MeshPhysicalMaterial({
      toneMapped: false,
      map: this.texture,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      metalness: 0,
      roughness: 0,
      transmission: 0.2,
      clearcoat: 0.3,
    });
  }
}

function App() {
  const glassyImageMaterialGenerator = useMemo(
    () => new GlassyImageMaterial(),
    [],
  );
  const [glassyImageMaterial, setGlassyImageMaterial] =
    useState<MeshPhysicalMaterial>();

  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene>
        <Gallery>
          <GalleryItem
            itemMaterial={glassyImageMaterialGenerator}
            onInit={({ material }) =>
              setGlassyImageMaterial(material as MeshPhysicalMaterial)
            }
          />

          {/* Other items... */}
        </Gallery>
      </GalleryScene>
    </main>
  );
}
```

#### Now
```tsx
function GlassyImage() {
  const material = useMemo(() => {
    return new MeshPhysicalMaterial({
      toneMapped: false,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      metalness: 0,
      roughness: 0,
      transmission: 0.2,
      clearcoat: 0.3,
    });
  }, []);

  const { material: finalMaterial } = useImageMaterial({
    src: "/images/img1.jpg",
    wrappedMaterial: material,
  });

  return <GalleryItem material={finalMaterial} />;
}

function App() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene>
        <Gallery>
          <GlassyImage />

          {/* Other items... */}
        </Gallery>
      </GalleryScene>
    </main>
  );
}
```

> **Hint** <br/>
> Import `useImageMaterial` from `react-gallery-3d`.

<br/>

### Gallery Ground API
In version 1.x.x, the `Gallery` component accepted props for managing a `Ground` component.
This allowed you to customize the ground material and properties for the gallery.

In version 2.x.x, the `Gallery` component no longer accepts props for managing a `Ground` component.
The `Ground` component is now managed internally by the `GalleryScene` component.
All the props for the `Ground` are now available in the `GalleryScene` component.

This makes it easier to use one `Ground` component for the entire gallery scene.

#### Before
```tsx
function App() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene>
        <Gallery
          ground={{
            reflectorMaterial: {
              metalness: 1,
              roughness: 0.9,
              mirror: 1,
              resolution: 2048,
            },
          }}
        >
          {/* Gallery items... */}
        </Gallery>
      </GalleryScene>
    </main>
  );
}
```

#### Now
```tsx
function App() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene
        ground={{
          reflectorMaterial: {
            metalness: 1,
            roughness: 0.9,
            mirror: 1,
            resolution: 2048,
          },
        }}
      >
        <Gallery>
          {/* Gallery items... */}
        </Gallery>

        <Gallery position-x={160}>
          {/* Gallery items... */}
        </Gallery>
      </GalleryScene>
    </main>
  );
}
```

> **Hint** <br/>
> You can now render multiple `Gallery` components in the `GalleryScene` component, and they will share the same ground.

<br/>

### Gallery Children
In version 1.x.x, the `Gallery` component only rendered children of supported types (e.g., `GalleryItem`, `SolidColorItem`, `ImageItem`, etc.).

In version 2.x.x, the `Gallery` component no longer limits its children to only supported types.
This means it will render all of its children unlike in previous versions where unknown children are ignored.

This allows you to render any component as a child of the `Gallery` component. 
Only children that are `GalleryItem` or renders a `GalleryItem` will be treated as gallery items. 

#### Before
```tsx

// THIS WORKS

function App() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene>
        <Gallery>
          <SolidColorItem color="red" />
          <SolidColorItem color="green" />
          <SolidColorItem color="blue" />
          <SolidColorItem color="yellow" />
        </Gallery>
      </GalleryScene>
    </main>
  );
}


// THIS DOES NOT WORK
// Gallery cannot determine the type of the children rendered by MyGalleryItems
// so it has no idea a valid GalleryItem is being rendered

const MyGalleryItems = () => {
  const images = Array.from(
    { length: 6 },
    (_, i) => `./images/img${i + 1}.jpg`,
  );

  const textures = useTexture(images);

  return textures.map((texture, index) => (
    <ImageItem key={index} texture={texture} />
  ));
};

function App() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene
        ground={{
          reflectorMaterial: {
            metalness: 1,
            roughness: 0.9,
            mirror: 1,
            resolution: 2048,
          },
        }}
        environment={{
          preset: "sunset",
        }}
      >
        <Gallery>
          <MyGalleryItems />
        </Gallery>
      </GalleryScene>
    </main>
  );
}
```

#### Now
```tsx
// THIS WORKS
// Gallery will render all children of the Gallery component
// ImageItem renders a GalleryItem, so it will be treated as a gallery item

const MyGalleryItems = () => {
  const images = Array.from(
    { length: 6 },
    (_, i) => `./images/img${i + 1}.jpg`,
  );

  const textures = useTexture(images);

  return textures.map((texture, index) => (
    <ImageItem key={index} texture={texture} />
  ));
};

function App() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <GalleryScene
        ground={{
          reflectorMaterial: {
            metalness: 1,
            roughness: 0.9,
            mirror: 1,
            resolution: 2048,
          },
        }}
        environment={{
          preset: "sunset",
        }}
      >
        <Gallery>
          <MyGalleryItems />
        </Gallery>
      </GalleryScene>
    </main>
  );
}
```

<br/>

### GalleryItem Properties
In version 1.x.x, the `useGallery()` hook was used to access the gallery item properties.

In version 2.x.x, the `useGallery()` hook is no longer available.
You should use the `useGalleryItem()` hook to access the gallery item properties.

#### Before
```tsx
function ItemLabel() {
  const {
    item: { itemIndex },
  } = useGallery();
  const textRef = useRef<Mesh | null>(null);
  const { position, orientation } = usePlacementOnGalleryItem(5);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    text.position.copy(position);
    text.lookAt(orientation);
    text.rotateY(MathUtils.degToRad(180));
  }, [orientation, position]);

  return (
    <Text ref={textRef} fontSize={6} color="white" textAlign="center">
      ITEM {(itemIndex || 0) + 1}
    </Text>
  );
}
```

#### Now
```tsx
function ItemLabel() {
  const { itemIndex } = useGalleryItem();
  const textRef = useRef<Mesh | null>(null);
  const { position, orientation } = usePlacementOnGalleryItem(5);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    text.position.copy(position);
    text.lookAt(orientation);
    text.rotateY(MathUtils.degToRad(180));
  }, [orientation, position]);

  return (
    <Text ref={textRef} fontSize={6} color="white" textAlign="center">
      ITEM {itemIndex + 1}
    </Text>
  );
}
```

> **Hint** <br/>
> Import `useGalleryItem` from `react-gallery-3d`.
> The `itemIndex` property is never `null` or `undefined`.
> The `itemIndex` property is now a direct property of the `useGalleryItem()` hook return value.
> The `useGalleryItem()` can only be used within a child component of the `GalleryItem` component.

## Contributing
Contributions are welcome! Please read our [Code of Conduct](https://github.com/isoteriksoftware/react-gallery-3d/blob/master/CODE_OF_CONDUCT.md) and [Contributing](https://github.com/isoteriksoftware/react-gallery-3d/blob/master/CONTRIBUTING.md)
