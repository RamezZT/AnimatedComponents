import MacDock from "./components/docks/MacDock";
import MacBook from "./components/whileScroll/MacBook";
import { Route, Routes } from "react-router";
import Home from "./Home";
import ModalExample from "./examples/ModalExample";
import AppleButton from "./components/apple/AppleButton";
import Layout from "./Layout";
import SharedLayoutAnimation from "./randoms/AnimatingLayouts/SharedLayoutAnimation";
import ComaprisonSlider from "./components/comparasionSlider/ComaprisonSlider";
import SvgLinedScroll from "./components/svglines/SvgLinedScroll";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="mac"
          element={
            <MacBook>
              <MacBook.Screen styles="mac-img">
                <MacDock />
              </MacBook.Screen>
            </MacBook>
          }
        />
        <Route path="modal" element={<ModalExample />} />
        <Route path="comparson-slider" element={<ComaprisonSlider />} />
        <Route path="svg-lines" element={<SvgLinedScroll />} />
        <Route path="appleButton" element={<AppleButton />} />
        <Route path="testing" element={<SharedLayoutAnimation />} />
      </Route>
    </Routes>
  );
};

export default App;
