import { GalleryScene } from "./components";
import { calculateCylinderSegmentTransform, SolidColorItem, ViewRendererProps } from "./core";
import { Html, Text } from "@react-three/drei";

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
            new SolidColorItem("purple", (props) => {
              const transform = calculateCylinderSegmentTransform(
                props.index,
                props.items.length,
                props.outerRadius,
              );

              return (
                <Html position={transform.position} rotation={transform.rotation} transform>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      transform: "scale(10, 10)",
                    }}
                  >
                    PURPLE <sub style={{ marginLeft: "5px" }}>with Html</sub>
                  </div>
                </Html>
              );
            }),
          ],
          item: {
            width: 120,
            height: 90,
          },
        }}
      />
    </div>
  );
}

export default App;
