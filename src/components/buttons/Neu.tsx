import { AnimationOptions, hover, motion, useAnimate } from "motion/react";
import { useEffect } from "react";
import { ArrowRight } from "../../assets/icons/ArrowRight";
// Define default easing options
const easing: AnimationOptions = { ease: "easeInOut", duration: 0.4 }; // Adjust duration if needed
const Neu = ({ title }: { title?: string }) => {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    hover(scope.current, () => {
      const startAnimation = async () => {
        // animate the btn
        animate(".btn", { y: -16, x: 16 }, easing);

        // animate the arrows
        animate(".before-arrow", { transform: "translateX(2rem)" }, easing);
        animate(".after-arrow", { transform: "translateX(2rem)" }, easing);

        // animate the text
        animate(".before-text", { transform: "translateY(-2rem)" }, easing);
        animate(".after-text", { transform: "translateY(-2rem)" }, easing);
      };
      startAnimation();

      const cleanUpFunction = async () => {
        // animate back btn
        animate(".btn", { y: 0, x: 0 }, easing);

        // animate back arrows
        animate(".before-arrow", { transform: "translateX(0rem)" }, easing);
        animate(".after-arrow", { transform: "translateX(-2rem)" }, easing);

        // animate back text
        animate(".before-text", { transform: "translateY(0rem)" }, easing);
        animate(".after-text", { transform: "translateY(0rem)" }, easing);
      };

      return cleanUpFunction;
    });
  }, [animate, scope]);

  return (
    <div className="poppins-bold w-56 h-16 bg-black flex" ref={scope}>
      <motion.button className="relative btn border-2  cursor-pointer flex justify-around bg-white flex-1 items-center text-black font-extrabold">
        <div className="relative overflow-hidden">
          <h1 className="before-text absolute  w-full h-full">
            {title ?? "HOVER ME!"}
          </h1>
          <h1 className="after-text absolute translate-y-8 w-full h-full text-red-500">
            {title ?? "HOVER ME!"}
          </h1>
          {/* this is just to keep the container width and  height */}
          <h1 className="opacity-0">{title ?? "HOVER ME!"}</h1>
        </div>
        <div className="relative w-7 h-7 overflow-hidden">
          <ArrowRight className="before-arrow font-bold size-7 absolute" />
          <ArrowRight className="after-arrow font-bold stroke-red-500 size-7 absolute -translate-x-8" />
        </div>
      </motion.button>
    </div>
  );
};

export default Neu;
