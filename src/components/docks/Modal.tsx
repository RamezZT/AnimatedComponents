import {
  MotionStyle,
  TargetAndTransition,
  motion,
  useDragControls,
} from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

type ModalProps = {
  style?: MotionStyle;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  handleClose: () => void;
  onMaxmize?: () => void;
  children?: ReactNode;
  containerElement?: HTMLDivElement;
  layoutId: string;
  drag: boolean;
};

// initial zindex
let ZIndex = 20;
export const Modal = ({
  style,
  handleClose,
  children,
  layoutId,
  drag,
  initial,
  animate,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const dragControls = useDragControls();

  // make the dragged modal stands above
  const bringToFront = () => {
    if (!modalRef || !modalRef.current) return;
    modalRef.current.style.zIndex = ZIndex.toString();
    ZIndex++;
  };
  const [constraints, setConstraints] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  useEffect(() => {
    const updateConstraints = () => {
      if (!modalRef.current) return;
      const screen = document.querySelector(".mac"); // The container
      if (!screen) return;

      const screenRect = screen.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();

      setConstraints({
        left: screenRect.left - modalRect.left,
        right: screenRect.right - modalRect.right,
        top: screenRect.top - modalRect.top,
        bottom: screenRect.bottom - modalRect.bottom,
      });
    };

    updateConstraints();
    bringToFront();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);
  return (
    <motion.div
      ref={modalRef} // used to control zindex
      onDragStart={bringToFront}
      dragListener={false}
      dragConstraints={constraints}
      dragControls={dragControls}
      drag={drag}
      dragMomentum={false}
      layout
      layoutId={layoutId}
      style={style}
      className="bg-[#dfdfde] mac-window-shadow flex flex-col absolute center-absolute"
      animate={animate}
      initial={initial}
      onDoubleClick={bringToFront}
    >
      <div
        onPointerDown={(event) => dragControls.start(event)}
        style={{ touchAction: "none" }}
        className="navbar flex gap-2 p-4 border-4 z-10 border-[#9d9d9d] cursor-pointer border-x-0 border-t-0 "
      >
        <button
          onClick={handleClose}
          className="rounded-full w-6 h-6 bg-red-500 cursor-pointer hover:scale-105"
        />
        <button className="rounded-full w-6 h-6 bg-gray-500" />
        <button className="rounded-full w-6 h-6 bg-green-500" />
      </div>

      {/* Content */}
      <div className="bg-white relative text-black flex-1">{children}</div>
    </motion.div>
  );
};
