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
import Flex from "./randoms/Flex/Flex";
import reactDocsItems from "./dummyData";
// import AnimatedList from "./components/Lists/AnimatedList";
import AnimatedList from "./bitsComponents/AnimatedList/AnimatedList";

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
        <Route path="flex" element={<Flex />} />
        <Route
          path="animated-list"
          // element={<AnimatedList items={reactDocsItems} />}
          element={<AnimatedList />}
        />
      </Route>
    </Routes>
  );
};

export default App;
