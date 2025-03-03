import {
  useAnimate,
  useTransform,
  motion,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { DragEvent, useContext, useRef } from "react";
import { DropIndicator } from "../dropdownmenus/DropIndicator";
import { DockItemContext } from "./DockItemContext";

const DockItemIcon = () => {
  const {
    handleDragStart,
    id,
    imgUrl,
    index,
    mouseX,
    title,
    totalItems,
    setIsOpened,
  } = useContext(DockItemContext);
  const parentRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();

  const scale = useTransform(mouseX, (x) => {
    if (x === null || !parentRef.current) return 1; // Default scale

    const { width } = parentRef.current.parentElement!.getBoundingClientRect();
    const itemWidth = width / totalItems;
    const itemCenter = index * itemWidth + itemWidth / 2; // Center of the current item

    // Distance from mouse to the center of this item
    const distance = Math.abs(x - itemCenter);

    // Only scale the center item and its first 2 siblings (left and right)
    const maxDistance = itemWidth * 2; // Only scale items within 2 item widths
    if (distance > maxDistance) return 1; // Don't scale items outside the range

    // Normalize distance: Closer items scale more, farther ones less
    const maxScale = 1.2; // Maximum scale for the center item
    const minScale = 1; // Minimum scale for items at the edge of the range
    const falloff = itemWidth * 1.5; // Controls how quickly the scale decreases with distance

    return (
      minScale + (maxScale - minScale) * Math.max(0, 1 - distance / falloff)
    );
  });

  const smoothScale = useSpring(scale, {
    stiffness: 300, // Adjust stiffness for smoother animation
    damping: 20,
  });

  const handleClickAnimation = async (e: React.MouseEvent) => {
    const item = e.target as HTMLDivElement;
    await animate(
      item,
      { y: [0, -60, 0, -20, 0, -15, 0] },
      {
        duration: 1, // Duration for the full bounce effect
      }
    );
  };

  return (
    <motion.div
      onClick={() => setIsOpened((prev) => !prev)}
      ref={parentRef}
      style={{ scale: smoothScale }}
      layout
      onDragStart={(e) => handleDragStart(e as unknown as DragEvent, id)}
      draggable={true}
      className="w-12 h-12 item cursor-pointer relative"
      id={`${title.replace(/\s+/g, "")}`}
      whileHover={{
        translateY: -5, // ✅ Keep only translateY for hover effect
      }}
      transition={{
        duration: 0.15, // ✅ Slightly smoother animation
        layout: {
          type: "spring",
        },
      }}
    >
      <DropIndicator beforeId={id} />
      <div className="relative z-[90] w-full h-full">
        <motion.img
          onClick={handleClickAnimation}
          ref={scope}
          src={imgUrl}
          alt={title}
          className="object-cover h-full w-full"
        />
      </div>
      <AnimatePresence></AnimatePresence>
    </motion.div>
  );
};

export default DockItemIcon;
