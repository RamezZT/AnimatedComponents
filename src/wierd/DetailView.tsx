import { motion } from "framer-motion";

export const DetailView = ({song, onClose}) => {
  return (
    <div className="rounded-xl absolute inset-0 z-10 grid auto-rows-min place-items-center bg-white p-4 text-center text-black">
      <img
        src={song.cover}
        alt={song.title}
        className="rounded-xl mb-4 aspect-square w-[200px]"
      />

      <div className="text-lg font-bold">
        {song.title}
      </div>
      <div className="text-sm">
        {song.artist}
      </div>

      <p className="max-w-[80%] text-sm">
        {song.description}
      </p>
      <button
        onClick={onClose}
        className="mt-4 w-full rounded-full bg-black px-4 py-2 text-white"
      >
        Back
      </button>
    </div>
  );
};