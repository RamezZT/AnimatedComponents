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
import AnimatedList from "./components/Lists/AnimatedList";
import VariantsComponent from "./frontendi.yi/variants";
import ResponsiveAnimations from "./frontendi.yi/MakingAnimationsResponsive/App";
import Test, { Test1 } from "./frontendi.yi/PutYourSkillsToTest/Test";
import ExcerciseInView from "./frontendi.yi/WhileInView/InViewExcercise";
import Test2 from "./frontendi.yi/PutYourSkillsToTest/Test2";
import Sticky from "./frontendi.yi/Stickys/StickyOne";
import InterStellar from "./frontendi.yi/Layout/InterStellar";
import Modal from "./frontendi.yi/Layout/Modal";
import SongModal from "./frontendi.yi/Layout/SongModal";
import SongApp from "./frontendi.yi/Layout/SongApp/SongApp";
// import AnimatedList from "./bitsComponents/AnimatedList/AnimatedList";

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
          element={<AnimatedList items={reactDocsItems} />}
          // element={<AnimatedList />}
        />
        <Route path="shit" element={<VariantsComponent />} />
        <Route path="responsive" element={<ResponsiveAnimations />} />
        <Route path="test1" element={<Test />} />
        <Route path="test2" element={<Test2 />} />
        <Route path="sound" element={<ExcerciseInView />} />
        <Route path="sticky" element={<Sticky />} />
        <Route path="inter" element={<InterStellar />} />
        <Route path="modall" element={<Modal />} />
        <Route path="songs" element={<SongModal />} />
        <Route path="ramezSongs" element={<SongApp />} />
      </Route>
    </Routes>
  );
};

export default App;
