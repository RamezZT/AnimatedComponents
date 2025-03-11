import { motion } from "framer-motion";

export const SongPreview = ({song, setSelectedSong}) => {
  return (
    <div
      className="rounded-xl grid cursor-pointer grid-cols-1 grid-rows-2 items-center gap-x-3 bg-white p-4 text-black md:grid-cols-[auto_1fr]"
      onClick={() => setSelectedSong(song)}
    >
      <img
        src={song.cover}
        alt={song.title}
        className="rounded-xl row-span-2 h-8 w-8"
      />

      <div className="text-lg font-bold leading-snug">
        {song.title}
      </div>
      <div className="text-sm leading-snug">
        {song.artist}
      </div>
    </div>
  );
};
      