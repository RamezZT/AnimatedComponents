import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import "./index.css";
import { ReactNode } from "react";

const SCREENSTRANSITION = "opacity 1s";

type MacBookProps = {
  children: ReactNode;
};

const MacBook = ({ children }: MacBookProps) => {
  const { scrollYProgress } = useScroll();
  const windowScale = useMotionValue<number>(20);
  const showSpinner = useMotionValue(1); // 1 = visible, 0 = hidden
  const showAppleLogo = useMotionValue(0); // 1 = visible, 0 = hidden
  const showDesktop = useMotionValue(0); // 1 = visible, 0 = hidden

  useMotionValueEvent(scrollYProgress, "change", () => {
    const progress = scrollYProgress.get();
    const newScale =
      progress < 0.5
        ? Math.trunc((0.2 + (progress / 0.5) * 0.8) * 100) // Scale up to 100% at 50% scroll
        : 100; // Stay at 100% after 50% scroll

    if (progress < 0.25) {
      showSpinner.set(1);
      showAppleLogo.set(0);
      showDesktop.set(0);
    } else if (progress < 0.5) {
      showSpinner.set(0);
      showAppleLogo.set(1);
      showDesktop.set(0);
    } else {
      showSpinner.set(0);
      showAppleLogo.set(0);
      showDesktop.set(1);
    }
    windowScale.set(newScale);
  });

  const springedScale = useSpring(windowScale);
  // DONT DO THIS
  // const brokenScale = useTransform(() => `${springedScale.get()}%`);

  // DO THIS INSTEAD
  const scale = useTransform(() => springedScale.get() / 100);

  return (
    <div className="min-h-screen scroll-bar">
      <motion.div
        style={{
          scale,
        }}
        className="bg-linear-270 w-full h-screen fixed mac-shadow "
      >
        <motion.span
          style={{
            opacity: showSpinner,
            transition: SCREENSTRANSITION,
          }}
          //   animate={{ opacity: showSpinner.get() }}
          className="loader !absolute cetner-absolute"
        />

        <motion.img
          style={{
            opacity: showAppleLogo,
            transition: SCREENSTRANSITION,
          }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/1010px-Apple_logo_grey.svg.png"
          alt=""
          className="w-24 h-24 object-contain absolute cetner-absolute "
        />

        <motion.div
          style={{
            opacity: showDesktop,
            transition: SCREENSTRANSITION,
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </motion.div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
    </div>
  );
};

type ScreenProps = {
  children: ReactNode;
  styles?: string;
};

MacBook.Screen = ({ children, styles }: ScreenProps) => {
  return <div className={`${styles} w-full h-full`}>{children}</div>;
};

export default MacBook;
