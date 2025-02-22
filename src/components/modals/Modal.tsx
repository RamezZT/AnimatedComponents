import React, {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
type ModalProps = {
  children?: ReactNode;
  styles?: string;
};

interface ModalContextType {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

type OpenProps = {
  children: ReactElement<{ handleOpen: () => void }>;
};

type CloseProps = {
  children: ReactElement<{ handleOpen: () => void }>;
  styles?: string;
};

type WindowProps = {
  children?: ReactNode;
  styles?: string;
};

const modalContext = createContext<ModalContextType>({
  isOpened: false,
  setIsOpened: () => {},
});

const root = document.querySelector("#root");

const Modal = ({ children }: ModalProps) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <modalContext.Provider
      value={{
        isOpened,
        setIsOpened,
      }}
    >
      {children}
    </modalContext.Provider>
  );
};

const Open = ({ children }: OpenProps) => {
  const { setIsOpened, isOpened } = useContext(modalContext);
  const handleOpen = () => {
    setIsOpened(true);
  };

  // return cloneElement(children, { handleOpen });
  if (isOpened) return null;
  return <div onClick={handleOpen}>{children}</div>;
};

const Close = ({ children, styles }: CloseProps) => {
  const { setIsOpened, isOpened } = useContext(modalContext);
  const handleClose = () => {
    setIsOpened(false);
  };

  if (!isOpened) return null;

  return (
    <div className={styles ?? ""} onClick={handleClose}>
      {children}
    </div>
  );
};

const Window = ({ children, styles }: WindowProps) => {
  const { isOpened, setIsOpened } = useContext(modalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);
  // handles closing the window when clicking ouside
  useEffect(() => {
    const handleCloseModal = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current?.contains(e.target as Node)) {
        setIsOpened(false);
      }
    };
    if (isOpened) document.addEventListener("mousedown", handleCloseModal);
    else if (!isOpened)
      document.removeEventListener("mousedown", handleCloseModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, [isOpened, modalRef, setIsOpened]);

  return createPortal(
    <AnimatePresence>
      {isOpened && (
        <motion.div
          className="absolute overflow-hidden cetner-absolute"
          key="window"
          exit={{ translateY: "800px", opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          initial={{ translateY: "800px", opacity: 0 }}
          transition={{
            ease: "easeInOut",
          }}
          style={{ willChange: "transform, opacity" }}
          onAnimationComplete={() => console.log("Animation complete")}
        >
          <div ref={modalRef} className={`${styles ?? "s"}`}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    root!
  );
};

Modal.Window = Window;
Modal.Open = Open;
Modal.Close = Close;

export default Modal;

/**
 * <Modal>
 *  <Modal.Open>
 *      btn foes heree
 *  </Modal.Open>
 *
 * <Modal.Window>
 *  Body goes here
 * </Modal.window>
 * </Modal>
 */
