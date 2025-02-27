import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { MotionStyle, motion } from "framer-motion";
import { createPortal } from "react-dom";

type MacWindowProps = {
  windowIcon: ReactNode;
  windowContent: ReactNode;
  layoutId: string;
};

const MacWindow = ({ windowIcon, windowContent, layoutId }: MacWindowProps) => {
  const [opened, setOpened] = useState(false);
  const [screen, setScreen] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setScreen(document.querySelector(".mac-img") as HTMLDivElement);
  }, []);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const handleClose = () => setOpened(false);
  // return windowIcon;
  return (
    <motion.div
      draggable="false"
      ref={parentRef}
      layout
      className="relative h-full w-full flex items-end justify-center flex-col"
    >
      {screen &&
        opened &&
        createPortal(
          <motion.div layout className="w-full justify-center">
            {opened && screen && (
              <Modal
                windowContent={windowContent}
                drag={true}
                layoutId={layoutId}
                ref={parentRef}
                handleClose={handleClose}
                style={{
                  width: 600,
                  height: 400,
                  opacity: 1,
                  borderRadius: 10,
                  overflow: "hidden",
                  // position: "absolute",
                  left: "200px",
                  top: "100px",
                  // translateX: "-50%",
                  // translateY: "-50%",
                }}
              />
            )}
          </motion.div>,
          screen!
        )}

      {/* <div className="flex gap-2 w-full justify-center items-center"> */}
      {!opened && (
        <Modal
          windowContent={windowContent}
          drag={false}
          layoutId={layoutId}
          ref={parentRef}
          handleClose={handleClose}
          style={{
            width: "20px",
            height: "20px",
            opacity: 0,
            // borderRadius: 10,
            // position: "absolute",

            // width: 600,
            // height: 400,
            // opacity: 0,
            // borderRadius: 10,
            // overflow: "hidden",
            // // position: "absolute",
            // left: "200px",
            // top: "100px",
            // // translateX: "-50%",
            // // translateY: "-50%",
          }}
        />
      )}
      {/* <button onClick={() => setOpened((prev) => !prev)}>{children}</button> */}
      <span
        onClick={() => {
          setOpened((prev) => !prev);
        }}
      >
        {windowIcon}
      </span>
      {/* </div> */}
    </motion.div>
  );
};

type ModalProps = {
  style?: MotionStyle;
  handleClose: () => void;
  onMaxmize?: () => void;
  children?: ReactNode;
  ref?: RefObject<HTMLDivElement | null>;
  layoutId: string;
  drag: boolean;
  windowContent: ReactNode;
};

const Modal = ({
  style,
  handleClose,
  windowContent,
  // ref,
  layoutId,
  drag,
}: ModalProps) => {
  return (
    <motion.div
      drag={drag}
      dragMomentum={false}
      layout
      layoutId={layoutId}
      style={{ ...style }}
      className="bg-[#dfdfde] mac-window-shadow flex flex-col"
      transition={
        {
          // duration: 2,
        }
      }
    >
      <div className="navbar flex gap-2 p-4 border-4 z-10 border-[#9d9d9d] cursor-pointer border-x-0 border-t-0 ">
        <button
          onClick={handleClose}
          className="rounded-full w-6 h-6 bg-red-500 cursor-pointer hover:scale-105"
        />
        <button className="rounded-full w-6 h-6 bg-gray-500" />
        <button className="rounded-full w-6 h-6 bg-green-500" />
      </div>

      {/* Content */}
      <div className="bg-white relative text-black flex-1 w-full">
        {windowContent}
      </div>
    </motion.div>
  );
};

export default MacWindow;
