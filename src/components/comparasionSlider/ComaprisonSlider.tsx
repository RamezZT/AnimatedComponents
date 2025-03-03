import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";

const ComparisonSlider = () => {
  const clip = useMotionValue(50); // Start at 50% split
  const container = useRef<HTMLDivElement | null>(null);

  const clipPath = useMotionTemplate`inset(0% 0% 0% ${clip}%)`;

  const handleSliderDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { point: { x: number } }
  ) => {
    if (!container.current) return;
    const { left, width } = container.current.getBoundingClientRect();
    let newX = ((info.point.x - left) / width) * 100; // Convert to percentage
    newX = Math.max(0, Math.min(100, newX)); // Keep within bounds

    clip.set(newX);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div ref={container} className="w-[600px] h-[400px] relative">
        {/* Draggable Slider */}
        <motion.span
          drag="x"
          dragMomentum={false}
          onDrag={handleSliderDrag}
          dragConstraints={container}
          className="h-full border-2 w-2 rounded-xl bg-white/70 z-20 absolute left-1/2 -translate-x-1/2 cursor-grab"
        />

        {/* Animated Blue Layer */}
        <motion.div
          style={{ clipPath }}
          className="bg-[url(https://i.pinimg.com/736x/81/8e/63/818e6391cf2bde39c5a6766e8db9dbd1.jpg)] bg-cover absolute inset-0 z-10"
        />

        {/* Static Green Layer */}
        <div className="bg-[url(https://i.pinimg.com/736x/a9/8e/51/a98e515415e67afa9ecd985aec31ac1a.jpg)] bg-cover absolute inset-0"></div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
