import { GalleryScene } from "./components";
import { SolidColorItem } from "./core";

function App() {
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
            new SolidColorItem("red"),
            new SolidColorItem("blue"),
            new SolidColorItem("green"),
            new SolidColorItem("yellow"),
            new SolidColorItem("orange"),
            new SolidColorItem("purple"),
          ],
        }}
      />
    </div>
  );
}

export default App;
