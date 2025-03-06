import "./index.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useDebounceCallback from "../../customhooks/useDebounceCallback";
import { motion } from "motion/react";
import { ReactDocItemType } from "../../dummyData";
import { levenshteinDistance } from "../../utils/searchUtils";
type AnimatedListProps = {
  items: ReactDocItemType[];
};

const filterItems = (items: ReactDocItemType[], search: string) => {
  if (!search) return [];

  const normalizedSearch = search.toLowerCase();

  return items
    .map((item) => {
      const name = item.name.toLowerCase();
      const words = name.split(/\s+/); // Split name into words
      const distances = words.map((word) =>
        levenshteinDistance(normalizedSearch, word)
      );

      const minDistance = Math.min(...distances);

      return { item, distance: minDistance };
    })
    .filter(({ distance }) => distance <= Math.max(2, search.length / 2)) // Allow small typos
    .sort((a, b) => a.distance - b.distance)
    .map(({ item }) => item);
};

const AnimatedList = ({ items }: AnimatedListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ReactDocItemType[]>([]);
  useEffect(() => {
    const handleSearchTermChange = () => {
      setSearchResults(filterItems(items, searchTerm));
    };

    handleSearchTermChange();
  }, [searchTerm, items]);

  return (
    <div className="w-full min-h-screen bg-white relative">
      <motion.div
        className="left-[50%] translate-x-[-50%] top-[20%] "
        style={{
          borderRadius: "12px",
          maxHeight: "32rem",
          width: "36rem",
          position: "absolute",
          backgroundColor: "black",
          padding: "1rem",
          overflow: "hidden",
        }}
        layout
      >
        <motion.div layout>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </motion.div>
        <motion.div />
        <motion.div
          animate={{
            maxHeight: "24rem", // Limits height for scrolling
            overflowY: "auto", // Enables scrolling
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            position: "relative",
          }}
        >
          {searchResults.length === 0 && searchTerm !== "" ? (
            <motion.div>
              <h2 className="text-md text-center p-4">
                No Results for: {searchTerm}
              </h2>
            </motion.div>
          ) : (
            searchResults.map(({ id, name, path }, idx) => (
              <AnimatedListItem
                key={id}
                name={name}
                id={id}
                path={path}
                idx={idx}
              />
            ))
          )}
        </motion.div>
        {searchResults.length !== 0 && <div className="bottom-gradient" />}
      </motion.div>
    </div>
  );
};
type AnimatedListItemProps = ReactDocItemType & { idx: number };

const AnimatedListItem = ({ name, path, idx }: AnimatedListItemProps) => {
  return (
    <motion.div
      className="p-4 bg-neutral-800 font-bold rounded-xl"
      layout
      initial={{ translateY: 60, opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        ease: "easeInOut",
      }}
      whileInView={{
        scale: 1,
      }}
      style={{
        marginTop: idx === 0 ? "0.5rem" : "",
      }}
    >
      <motion.h1 className="text-xl">{name}</motion.h1>
      <motion.h2>{path}</motion.h2>
    </motion.div>
  );
};

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ setSearchTerm }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedHandleSearchChange = useDebounceCallback(setSearchTerm, 200);
  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    debouncedHandleSearchChange(e.target.value);
  };

  return (
    <motion.div className="relative flex items-center gap-1 px-2">
      <motion.span
        className="w-full bg-white absolute bottom-0 left-0"
        animate={{
          scale: searchValue === "" ? 0 : 1,
          borderBottom: searchValue === "" ? "0px solid" : "1px solid",
        }}
        transition={{ duration: 0.2 }}
      />
      <FaSearch color="#737373" />
      <input
        type="text"
        placeholder="Search the docs"
        className="outline-0 placeholder:text-neutral-500 placeholder:text-2xl text-2xl p-2 flex-1"
        value={searchValue}
        onChange={handleInputValueChange}
      />
    </motion.div>
  );
};

export default AnimatedList;
