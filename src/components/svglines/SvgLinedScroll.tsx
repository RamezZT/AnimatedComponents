import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const SvgLinedScroll = () => {
  const conatinerRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll({ target: conatinerRef });

  // Get viewport height
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;

  // Calculate when the container's top reaches (bottom + 60px)
  const startPoint = useTransform(
    scrollY,
    (value) =>
      value - (conatinerRef.current?.offsetTop ?? 0) + viewportHeight - 60
  );

  // Map startPoint to a 0 → 1 progress range
  const clipPathY = useTransform(
    startPoint,
    [0, viewportHeight],
    ["100%", "0%"]
  );
  const motionClipPath = useMotionTemplate`inset(0 0 ${clipPathY} 0)`;

  return (
    <>
      <div className="min-h-screen"></div>
      <motion.div
        ref={conatinerRef}
        className="flex flex-col items-center min-h-screen relative"
        style={{ clipPath: motionClipPath }}
      >
        <div className="bg-[#66a4f8] grow w-[1px]" />
        <LeftSvg style="absolute top-[100px] -translate-x-[50%]" />
        <RightSvg style="absolute top-[434px] translate-x-[50%]" />
      </motion.div>
      <div className="min-h-screen"></div>
    </>
  );
};

export default SvgLinedScroll;

const LeftSvg = ({ style }: { style?: string }) => (
  <svg
    width="92"
    height="335"
    viewBox="0 0 115 420"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={style}
  >
    <path
      d="M113.59 1C113.59 1 106.59 49.5 51.5898 102C-3.41016 154.5 1.08984 205.5 1.08984 210.5C1.08984 215.5 -3.41016 265.5 51.5898 318C106.59 370.5 113.59 419 113.59 419"
      stroke="url(#paint0_linear_474_15)"
      strokeWidth="2"
    ></path>
    <defs>
      <linearGradient
        id="paint0_linear_474_15"
        x1="57.2953"
        y1="871"
        x2="57.2953"
        y2="-482"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#60A5FA"></stop>
        <stop offset="1" stopColor="#60A5FA"></stop>
      </linearGradient>
    </defs>
  </svg>
);

const RightSvg = ({ style }: { style?: string }) => (
  <svg
    width="92"
    height="335"
    viewBox="0 0 115 419"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={style}
  >
    <path
      d="M1 418.5C1 418.5 8 370 63 317.5C118 265 113.5 214 113.5 209C113.5 204 118 154 63 101.5C8 49 1 0.5 1 0.5"
      stroke="url(#paint0_linear_449_15)"
      strokeWidth="2"
    ></path>
    <defs>
      <linearGradient
        id="paint0_linear_449_15"
        x1="57.2945"
        y1="-451.5"
        x2="57.2945"
        y2="901.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#60A5FA"></stop>
        <stop offset="1" stopColor="#60A5FA"></stop>
      </linearGradient>
    </defs>
  </svg>
);
