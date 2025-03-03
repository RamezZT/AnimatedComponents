import { DragEvent, createContext } from "react";
import { MotionValue } from "framer-motion";

type DockItemContextType = {
  imgUrl: string;
  title: string;
  index: number;
  mouseX: MotionValue;
  totalItems: number;
  id: string;
  handleDragStart: (e: DragEvent, itemId: string) => void;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DockItemContext = createContext(
  {} as unknown as DockItemContextType
);
