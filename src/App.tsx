// import { HoverImageLinks } from "./components/links/HoverImageLinks";
import { useState } from "react";
import { HoverImageLinks } from "./components/links/HoverImageLinks";
import { NonStyledHoverImageLinks } from "./components/links/NonStylesHoverImageLinks";
import { AnimatePresence } from "framer-motion";
import MacDock from "./components/docks/MacDock";
import MacBook from "./components/whileScroll/MacBook";
import { Route, Routes } from "react-router";
import Modal from "./components/modals/Modal";
import Home from "./Home";
import ModalExample from "./examples/ModalExample";
import AppleButton from "./components/apple/AppleButton";

const App = () => {
  const [show, setShow] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShow(true);
  //   }, 4500);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  // return (
  // <MacBook>
  //   <MacBook.Screen styles="mac-img">
  //     <MacDock />
  //   </MacBook.Screen>
  // </MacBook>
  // );
  return (
    <Routes>
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
      <Route path="appleButton" element={<AppleButton />} />
    </Routes>
  );
  return (
    <AnimatePresence mode="popLayout">
      {show ? <HoverImageLinks /> : <NonStyledHoverImageLinks />}
    </AnimatePresence>
  );
};

export default App;

/**
 *
 * Dear petsmasterpiece i saw your business growing and reaching alot of people but i
 * noticed that there are no website to present your art
 * if u are interested in building one don't hesitate to contact me
 * My Portfolio:Ramez.tech
 * previous work: jordanastro.com
 */
