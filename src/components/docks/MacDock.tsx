import { useRef, DragEvent, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
  useAnimate,
} from "framer-motion";
import "./dock.css";
import MacWindow from "../windows/MacWindow";

const DEFAULT_ITEMS = [
  {
    imgUrl:
      "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png",
    title: "Spotify",
    id: "1",
  },
  {
    imgUrl:
      "https://brandeps.com/logo-download/I/Instagram-Icon-logo-vector-01.svg",
    title: "Instagram",
    id: "2",
  },
  {
    imgUrl:
      "https://brandeps.com/logo-download/G/Google-Messages-logo-vector-01.svg",
    title: "Google Messages",
    id: "3",
  },
  {
    imgUrl:
      "https://brandeps.com/icon-download/A/Apple-podcasts-icon-vector-01.svg",
    title: "Apple Podcasts",
    id: "4",
  },
  {
    imgUrl:
      "https://brandeps.com/icon-download/A/Apple-app-store-icon-vector-02.svg",
    title: "Apple App Store",
    id: "5",
  },
  {
    imgUrl: "https://brandeps.com/icon-download/S/Slack-icon-vector-08.svg",
    title: "Slack",
    id: "6",
  },
  {
    imgUrl:
      "https://jablickar.cz/wp-content/uploads/2022/02/macos-ikonka-kose-2.png",
    title: "MacOS Trash",
    id: "7",
  },
];

const getIndicators = () => {
  return Array.from(
    document.querySelectorAll(`.indicator`) as unknown as HTMLElement[]
  );
};

export const MacDockExample = () => {
  return (
    <div className="task-bar mac-img min-h-screen flex items-center justify-center bg-cover overflow-hidden relative ">
      <MacDock />
    </div>
  );
};

const MacDock = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue<number | null>(null);
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const handleMouseMovement = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX } = e;
    const { left } = ref.current.getBoundingClientRect();

    // Normalize mouse position within the dock
    const relativeX = clientX - left;
    mouseX.set(relativeX); // ✅ Setting the mouse position
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    removeHighlights();

    const target = (e.target as HTMLElement).closest(".item");
    if (!target) return;

    const draggedItemId = e.dataTransfer.getData("itemId"); // Ensure it's a number

    const nearestIndicator = getNearestIndicator(e, getIndicators());
    if (!nearestIndicator) return;

    const beforeId = nearestIndicator.dataset["before"];

    // Extract the dragged item and filter the list in a single pass
    let draggedItem: (typeof items)[number] | undefined;

    const copiedItems = items.filter((item) => {
      if (item.id === draggedItemId) {
        draggedItem = item;
        return false; // Remove the dragged item
      }
      return true;
    });

    if (!draggedItem) return;

    const indexInsertion = copiedItems.findIndex(
      (item) => item.id === beforeId
    );

    // If beforeId is invalid, append the item to the end
    if (indexInsertion === -1) {
      copiedItems.push(draggedItem);
    } else {
      copiedItems.splice(indexInsertion, 0, draggedItem);
    }
    setItems(copiedItems);
  };

  const getNearestIndicator = (
    e: React.DragEvent,
    indicators: HTMLElement[]
  ): HTMLDivElement | null => {
    // Get the mouse position from the drag event
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    let nearestIndicator: HTMLElement | null = null;
    let minDistance = Infinity; // Start with a very large distance

    indicators.forEach((indicator) => {
      // Get the position of the indicator
      const indicatorRect = indicator.getBoundingClientRect();
      const indicatorCenterX = indicatorRect.left + indicatorRect.width / 2;
      const indicatorCenterY = indicatorRect.top + indicatorRect.height / 2;

      // Calculate the distance from the mouse to the indicator center
      const distance = Math.sqrt(
        Math.pow(mouseX - indicatorCenterX, 2) +
          Math.pow(mouseY - indicatorCenterY, 2)
      );

      // Update the nearest indicator if a closer one is found
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndicator = indicator;
      }
    });

    // Return the nearest indicator, if found
    return nearestIndicator;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const indicators = getIndicators();

    // get nearest indicator and highlight it
    const nearestIndicator = getNearestIndicator(e, indicators);

    removeHighlights(indicators);
    if (!nearestIndicator) return;

    nearestIndicator.style.opacity = "1";
    // highlight the nearestIndicator
    // nearestIndicator.
  };

  const removeHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const handleDragLeave = () => {
    removeHighlights();
  };

  const handleDragStart = (e: DragEvent, itemId: string) => {
    e.dataTransfer.setData("itemId", itemId.toString()); // Store the item's key or any relevant data
  };
  return (
    <motion.div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      ref={ref}
      onMouseMove={handleMouseMovement}
      onMouseLeave={() => mouseX.set(null)}
      // absolute bottom-0 translate-y-[75%]  hover:-translate-y-[20%]
      className="flex z-[1000] gap-3 p-3 bg-white/40 backdrop-blur-lg shadow-lg rounded-2xl  transition-all  absolute bottom-0 left-[50%] -translate-x-[50%] "
    >
      {items.map((item, idx) => (
        // <DropIndicator beforeId={item.id} />
        <DockItem
          key={item.id}
          id={item.id}
          handleDragStart={handleDragStart}
          title={item.title}
          imgUrl={item.imgUrl}
          index={idx}
          mouseX={mouseX}
          totalItems={items.length}
        />
      ))}
    </motion.div>
  );
};

type DockItemProps = {
  imgUrl: string;
  title: string;
  index: number;
  mouseX: MotionValue;
  totalItems: number;
  id: string;
  handleDragStart: (e: DragEvent, itemId: string) => void;
};

const DockItem = ({
  id,
  imgUrl,
  title,
  index,
  mouseX,
  totalItems,
  handleDragStart,
}: DockItemProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const scale = useTransform(mouseX, (x) => {
    if (x === null || !parentRef.current) return 1; // Default scale
    const { width } = parentRef.current.parentElement!.getBoundingClientRect(); // ✅ Use parent div width
    const itemWidth = width / totalItems;
    const itemCenter = index * itemWidth + itemWidth / 2; // ✅ Correct center calculation
    // Distance from mouse to the center of this item
    const distance = Math.abs(x - itemCenter);

    // Normalize distance: Closer items scale more, farther ones less
    const maxScale = 1.1;
    const minScale = 1;
    const falloff = itemWidth * 1.2; // ✅ Increased range for smooth effect

    return (
      minScale + (maxScale - minScale) * Math.max(0, 1 - distance / falloff)
    );
  });
  // const smoothScale = useSpring(scale);

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
      ref={parentRef}
      style={{ scale }}
      layout={true}
      onDragStart={(e) => handleDragStart(e as unknown as DragEvent, id)}
      draggable={true}
      className="w-12 h-12 item cursor-pointer relative"
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
      <MacWindow
        layoutId={id}
        windowIcon={
          <motion.img
            onClick={handleClickAnimation}
            ref={scope}
            src={imgUrl}
            alt={title}
            className="object-cover h-full w-full"
          />
        }
        windowContent={<h1>{title}</h1>}
      >
        {/* we only pass the icon */}
      </MacWindow>
    </motion.div>
  );
};
type DropIndicatorProps = {
  beforeId: string | null;
};
const DropIndicator = ({ beforeId }: DropIndicatorProps) => {
  return (
    <span
      data-before={beforeId?.toString() || "-1"}
      className="absolute indicator h-full  w-[6px] rounded-full -left-[10px] bg-amber-50/100 opacity-0 transition-all duration-150"
    />
  );
};

export default MacDock;
