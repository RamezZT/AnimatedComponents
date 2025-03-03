import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { DockItemContext } from "./DockItemContext";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Modal } from "./Modal";

type DockItemWindowProps = {
  children?: ReactNode;
};

const DockItemWindow = ({ children }: DockItemWindowProps) => {
  const { title, isOpened, setIsOpened } = useContext(DockItemContext);
  const [screen, setScreen] = useState<HTMLDivElement | null>(null);
  const [parentIcon, setParentIcon] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    setScreen(document.querySelector(".mac") as HTMLDivElement);
    setParentIcon(
      document.querySelector(`#${title.replace(/\s+/g, "")}`) as HTMLDivElement
    );
  }, [title]);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const handleClose = () => setIsOpened(false);
  // only show the modal if it is opened
  if (!screen || !parentIcon) return null;

  // if its opned then move it to the icon place and hide it
  // else display it noramlly

  if (!isOpened)
    return createPortal(
      <Modal
        drag={true}
        layoutId={title}
        handleClose={handleClose}
        animate={{
          width: 1,
          height: 1,
          opacity: 0,
          borderRadius: 10,
          overflow: "hidden",
        }}
        initial={{
          width: 600,
          height: 400,
        }}
      >
        {children}
      </Modal>,
      parentIcon!
    );

  if (isOpened)
    return (
      <motion.div draggable="false" ref={parentRef} layout>
        {createPortal(
          <Modal
            drag={true}
            layoutId={title}
            handleClose={handleClose}
            style={{
              minWidth: 600,
              minHeight: 400,
              opacity: 1,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {children}
          </Modal>,
          screen
        )}
      </motion.div>
    );
};

export default DockItemWindow;
