// import { HoverImageLinks } from "./components/links/HoverImageLinks";
import { useEffect, useState } from "react";
import { HoverImageLinks } from "./components/links/HoverImageLinks";
import { NonStyledHoverImageLinks } from "./components/links/NonStylesHoverImageLinks";
import { AnimatePresence } from "framer-motion";
import MacDock from "./components/docks/MacDock";

const App = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 4500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <MacDock />;
  return (
    <AnimatePresence mode="popLayout">
      {show ? <HoverImageLinks /> : <NonStyledHoverImageLinks />}
    </AnimatePresence>
  );
};

export default App;
