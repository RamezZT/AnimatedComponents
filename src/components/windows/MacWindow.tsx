import React, { CSSProperties, useState } from "react";
import { AnimatePresence, MotionStyle, motion } from "framer-motion";

const MacWindow = () => {
  const [opened, setOpened] = useState(true);
  return (
    <motion.div
      layout
      className="bg-gray-500 relative h-full w-full flex items-end justify-center flex-col"
    >
      <motion.div
        layout
        className="self-center flex items-center flex-1 w-full justify-center"
      >
        {opened && (
          <motion.div
            layoutId="window"
            style={{
              width: 600,
              height: 400,
              opacity: 1,
              borderRadius: 10,
              overflow: "hidden",
            }}
            transition={{
              type: "spring",
            }}
            className="bg-[#dfdfde] mac-window-shadow"
          >
            <div className="navbar flex gap-2 p-4 border-4 border-[#9d9d9d] border-x-0 border-t-0 ">
              <button className="rounded-full w-6 h-6 bg-red-500" />
              <button className="rounded-full w-6 h-6 bg-gray-500" />
              <button className="rounded-full w-6 h-6 bg-green-500" />
            </div>
            <div className="bg-white text-black w-full h-full">
              <h1 className="text-3xl font-semibold">Ramez Tayem</h1>
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="flex gap-2 w-full justify-center items-center">
        {!opened && (
          <motion.div
            layoutId="window"
            style={{
              width: 2,
              height: 2,
              opacity: 0.5,
              borderRadius: 100,
            }}
            transition={{
              type: "spring",
            }}
          ></motion.div>
        )}
        <button
          onClick={() => setOpened((prev) => !prev)}
          className="bg-blue-500 rounded-full px-4 py-2 text-2xl absolute bottom-0"
        >
          Click me
        </button>
      </div>
    </motion.div>
  );
};

const modal = ({ style }: { style?: MotionStyle }) => {
  return (
    <motion.div
      layoutId="window"
      style={style}
      transition={{
        type: "spring",
      }}
      className="bg-[#dfdfde] mac-window-shadow"
    >
      <div className="navbar flex gap-2 p-4 border-4 border-[#9d9d9d] border-x-0 border-t-0 ">
        <button className="rounded-full w-6 h-6 bg-red-500" />
        <button className="rounded-full w-6 h-6 bg-gray-500" />
        <button className="rounded-full w-6 h-6 bg-green-500" />
      </div>
      <div className="bg-white text-black w-full h-full">
        <h1 className="text-3xl font-semibold">Ramez Tayem</h1>
      </div>
    </motion.div>
  );
};
export default MacWindow;
