import { useEffect, useRef } from "react";
import DownArrow from "../../assets/icons/DownArrow";
import { stagger, useAnimate, motion, AnimationOptions } from "framer-motion";
import Edit from "../../assets/icons/Edit";
import Like from "../../assets/icons/Like";
import Share from "../../assets/icons/Share";
import Save from "../../assets/icons/Save";
import "./staggered.css";

type StaggeredProps = {
  title?: string;
};

const initialItemTextAnimation = {
  translateY: "-2rem",
  opacity: 0,
};

const initialIconAnimation = {
  translateY: "-2rem",
  opacity: 0,
};

const TRANSITION: AnimationOptions = {
  delay: stagger(0.1),
  ease: "backInOut",
};

const Staggered = ({ title }: StaggeredProps) => {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const opened = useRef(false);
  const isAnimating = useRef(false); // Prevents multiple clicks

  useEffect(() => {
    const btn = scope.current.querySelector(".btn");
    console.log(btn);
    if (!btn) return;

    const handleClick = async () => {
      if (isAnimating.current) return; // Ignore clicks if an animation is running
      isAnimating.current = true; // Lock interactions

      if (!opened.current) {
        await Promise.all([
          animate(".arrow", { rotate: 180 }, TRANSITION),
          animate(
            ".menu",
            { scaleY: 1, transformOrigin: "top", opacity: 1 },
            TRANSITION
          ),
        ]);

        await Promise.all([
          animate(
            ".icon",
            { transform: "translateY(0rem)", opacity: 1 },
            TRANSITION
          ),
          animate(
            ".text",
            { transform: "translateY(0rem)", opacity: 1 },
            TRANSITION
          ),
        ]);

        opened.current = true;
      } else {
        await animate(".arrow", { rotate: 0 });

        await Promise.all([
          animate(
            ".icon",
            { transform: "translateY(-2rem)", opacity: 0 },
            TRANSITION
          ),
          animate(
            ".text",
            { transform: "translateY(-2rem)", opacity: 0 },
            TRANSITION
          ),
        ]);

        await animate(
          ".menu",
          {
            scaleY: 0,
            transformOrigin: "top",
            opacity: 0,
          },
          TRANSITION
        );

        opened.current = false;
      }

      isAnimating.current = false; // Unlock interactions after animation completes
    };

    btn.addEventListener("click", handleClick);
    return () => btn.removeEventListener("click", handleClick); // Cleanup event listener
  }, [animate, scope]);

  return (
    <div ref={scope} className="poppins-bold">
      <ul className="select-none relative bg-blue-400 cursor-pointer gap-4 rounded-sm px-4 py-2 flex flex-col items-center justify-around text-xl font-semibold">
        <button className="btn flex items-center gap-4 cursor-pointer">
          <span>{title ?? "Post Actions"}</span>
          <DownArrow className="arrow size-6 rotate-180" />
        </button>
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          className="menu absolute top-14 w-[130%] flex flex-col bg-white overflow-hidden menu-shadow py-2 px-1 rounded-xl"
        >
          {[
            { label: "Edit", Icon: Edit },
            { label: "Like", Icon: Like },
            { label: "Share", Icon: Share },
            { label: "Save", Icon: Save },
          ].map(({ label, Icon }, index) => (
            <li
              key={index}
              className="menu-option hover:bg-gray-200 hover:rounded-xl transition-all p-2 flex justify-start items-center gap-3 flex-1 text-black"
            >
              <motion.span initial={initialIconAnimation} className="icon">
                <Icon className="size-4" />
              </motion.span>
              <motion.span
                initial={initialItemTextAnimation}
                className="text text-md font-medium"
              >
                {label}
              </motion.span>
            </li>
          ))}
        </motion.div>
      </ul>
    </div>
  );
};

export default Staggered;
