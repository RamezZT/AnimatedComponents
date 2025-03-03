import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export const InstagramWindow = () => {
  const [likes, setLikes] = useState(512);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <motion.div
      className="absolute bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden"
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      initial={{ scale: 0.8, opacity: 0 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ width: "500px", height: "600px" }}
    >
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-semibold text-gray-800">username</span>
        </div>
        <IoMdClose
          className="cursor-pointer hover:text-red-500 text-2xl"
          onClick={() => {}}
        />
      </div>

      {/* Image */}
      <div className="flex-1 bg-gray-200">
        <img
          src="https://via.placeholder.com/500"
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Footer */}
      <div className="p-4">
        {/* Icons */}
        <div className="flex gap-4">
          {isLiked ? (
            <AiFillHeart
              className="w-6 h-6 cursor-pointer text-red-500"
              onClick={toggleLike}
            />
          ) : (
            <AiOutlineHeart
              className="w-6 h-6 cursor-pointer text-gray-800"
              onClick={toggleLike}
            />
          )}
          <FaRegComment className="w-6 h-6 cursor-pointer text-gray-800" />
        </div>

        {/* Like count */}
        <p className="mt-2 text-sm font-semibold">{likes} likes</p>

        {/* Caption */}
        <p className="text-sm mt-1">
          <span className="font-semibold">username</span> This is an Instagram
          post UI 🍕
        </p>
      </div>
    </motion.div>
  );
};
