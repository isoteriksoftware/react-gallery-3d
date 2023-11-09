import { GalleryScene } from "./components";
import { calculateCylinderSegmentTransform, SolidColorItem, ViewRendererProps } from "./core";
import { Text } from "@react-three/drei";

function App() {
  const createText = (text: string, viewRendererProps: ViewRendererProps) => {
    const transform = calculateCylinderSegmentTransform(
      viewRendererProps.index,
      viewRendererProps.items.length,
      viewRendererProps.outerRadius,
    );

    return (
      <Text
        color="white"
        anchorX="center"
        anchorY="middle"
        fontSize={10}
        position={transform.position}
        rotation={transform.rotation}
      >
        {text}
      </Text>
    );
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <GalleryScene
        gallery={{
          items: [
            new SolidColorItem("red", (props) => {
              return createText("RED", props);
            }),
            new SolidColorItem("blue"),
            new SolidColorItem("green", (props) => {
              return createText("GREEN", props);
            }),
            new SolidColorItem("yellow"),
            new SolidColorItem("orange", (props) => {
              return createText("ORANGE", props);
            }),
            new SolidColorItem("purple"),
          ],
        }}
      />
    </div>
  );
}

export default App;
