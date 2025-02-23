import MacDock from "./components/docks/MacDock";
import MacBook from "./components/whileScroll/MacBook";
import { Route, Routes } from "react-router";
import Home from "./Home";
import ModalExample from "./examples/ModalExample";
import AppleButton from "./components/apple/AppleButton";
import Layout from "./Layout";
import SharedLayoutAnimation from "./randoms/AnimatingLayouts/SharedLayoutAnimation";
import MacWindow from "./components/windows/MacWindow";

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
                <MacWindow />
              </MacBook.Screen>
            </MacBook>
          }
        />
        <Route path="modal" element={<ModalExample />} />
        <Route path="appleButton" element={<AppleButton />} />
        <Route path="testing" element={<SharedLayoutAnimation />} />
      </Route>
    </Routes>
  );
};

export default App;
