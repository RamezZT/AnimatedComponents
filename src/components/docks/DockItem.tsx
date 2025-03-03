import { MotionValue } from "framer-motion";
import { DragEvent, ReactNode, useState } from "react";
import { DockItemContext } from "./DockItemContext";
import DockItemIcon from "./DockItemIcon";
import DockItemWindow from "./DockItemWindow";

/**
 * <MacDock>
 *      <DockItem>
 *          <DockIcon/>
 *          <DockScreen/>
 *      </DockItem>
 * </MacDock>
 */

export type DockItemProps = {
  imgUrl: string;
  title: string;
  index: number;
  mouseX: MotionValue;
  totalItems: number;
  id: string;
  handleDragStart: (e: DragEvent, itemId: string) => void;
  children: ReactNode;
};

// we will be creating the context for each item so if one changes
// then the others don't have to rerender

export const DockItem = ({
  children,
  imgUrl,
  title,
  mouseX,
  totalItems,
  id,
  index,
  handleDragStart,
}: DockItemProps) => {
  const [isOpened, setIsOpened] = useState(false);

  /**
   * this will render the icon and the screen
   * but the screen will be rendered using the reactPortal
   */

  const contextValue = {
    isOpened,
    setIsOpened,
    imgUrl,
    title,
    mouseX,
    totalItems,
    id,
    index,
    handleDragStart,
  };

  return (
    <DockItemContext value={contextValue}>
      <div>{children}</div>
    </DockItemContext>
  );
};

// Adding composite components
DockItem.DockItemIcon = DockItemIcon;
DockItem.DockItemWindow = DockItemWindow;
