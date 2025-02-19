import {
  useMotionValue,
  motion,
  useSpring,
  useTransform,
  useAnimate,
  DOMKeyframesDefinition,
} from "framer-motion";
import { stagger } from "motion";
import React, { useLayoutEffect } from "react";
import { FiArrowRight } from "react-icons/fi";

export const HoverImageLinks2 = () => {
  return (
    <section className="bg-neutral-950 p-4 md:p-8 w-[800px]">
      <div className="mx-auto max-w-5xl">
        <Link
          heading="About"
          subheading="Learn what we do here"
          imgSrc="https://i.pinimg.com/736x/3d/ee/2a/3dee2a7eee99b654fbca829e68f2aa2f.jpg"
          href="#"
        />
        <Link
          heading="Clients"
          subheading="We work with great people"
          imgSrc="https://i.pinimg.com/736x/a9/8e/51/a98e515415e67afa9ecd985aec31ac1a.jpg"
          href="#"
        />
        <Link
          heading="Portfolio"
          subheading="Our work speaks for itself"
          imgSrc="https://i.pinimg.com/736x/3d/8e/f6/3d8ef6a27ca472841bb3171710e31bef.jpg"
          href="#"
        />
        <Link
          heading="Careers"
          subheading="We want cool people"
          imgSrc="https://i.pinimg.com/736x/81/8e/63/818e6391cf2bde39c5a6766e8db9dbd1.jpg"
          href="#"
        />
        <Link
          heading="Fun"
          subheading="Incase you're bored"
          imgSrc="https://i.pinimg.com/736x/0e/5c/c3/0e5cc354407b2e4d493220d4cd0ec1b3.jpg"
          href="#"
        />
      </div>
    </section>
  );
};

interface LinkProps {
  heading: string;
  imgSrc: string;
  subheading: string;
  href: string;
}

const Link = ({ heading, imgSrc, subheading, href }: LinkProps) => {
  //   const ref = useRef<HTMLAnchorElement | null>(null);
  const [scope, animate] = useAnimate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  console.log(top.get(), left.get());

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const rect = scope.current!.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  type Variants = {
    initial: DOMKeyframesDefinition;
    whileHover: DOMKeyframesDefinition;
  };

  const headContainerVariants: Variants = {
    initial: {
      x: 0,
    },
    whileHover: {
      x: -16,
    },
  };
  const headerVariants: Variants = {
    initial: {
      x: 0,
    },
    whileHover: {
      x: 16,
    },
  };
  const arrowVariants: Variants = {
    initial: {
      x: "25%",
      opacity: 0,
    },
    whileHover: {
      x: "0%",
      opacity: 1,
    },
  };

  const imgVariants: Variants = {
    initial: { scale: 0, rotate: "-12.5deg" },
    whileHover: { scale: 1, rotate: "12.5deg" },
  };

  const mouseEnter = () => {
    animate(".head-container", headContainerVariants.whileHover, {
      type: "spring",
    });
    animate(".char", headerVariants.whileHover, {
      delay: stagger(0.075, { startDelay: 0.25 }),
      type: "spring",
    });
    animate(".arrow", arrowVariants.whileHover, {
      type: "spring",
    });
    animate(".img", imgVariants.whileHover, {
      type: "spring",
    });
  };
  const mouseLeave = () => {
    animate(".head-container", headContainerVariants.initial);
    animate(".char", headerVariants.initial, {
      delay: stagger(0.075),
      type: "spring",
    });
    animate(".arrow", arrowVariants.initial, {
      type: "spring",
    });
    animate(".img", imgVariants.initial, {
      type: "spring",
    });
  };

  // this is to reset the animations
  useLayoutEffect(() => {
    animate(".head-container", headContainerVariants.initial);
    animate(".char", headerVariants.initial, {
      duration: 0,
    });
    animate(".arrow", arrowVariants.initial, {
      duration: 0,
    });
    // animate(".img", imgVariants.initial, {
    //   duration: 0,
    // });
  }, [animate]);

  return (
    <a
      href={href}
      //   ref={ref}
      ref={scope}
      onMouseEnter={() => {
        mouseEnter();
        // handleMouseMove(e);
      }}
      onMouseLeave={() => {
        mouseLeave();
      }}
      onMouseMove={handleMouseMove}
      //   initial="initial"
      //   whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
    >
      <div>
        <span
          //   variants={{
          //     initial: { x: 0 },
          //     whileHover: { x: -16 },
          //   }}
          //   transition={{
          //     type: "spring",
          //     staggerChildren: 0.075,
          //     delayChildren: 0.25,
          //   }}
          className="head-container relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
        >
          {heading.split("").map((l, i) => (
            <span
              //   variants={{
              //     initial: { translateX: 0 },
              //     whileHover: { translateX: 16 },
              //   }}
              //   transition={{ type: "spring" }}
              className="char inline-block"
              key={i}
            >
              {l}
            </span>
          ))}
        </span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top: top,
          left: left,
          //   translateX: "-50%",
          //   translateY: "-50%",
        }}
        // variants={{
        //   initial: { scale: 0, rotate: "-12.5deg" },
        //   whileHover: { scale: 1, rotate: "12.5deg" },
        // }}
        // transition={{ type: "spring" }}
        src={imgSrc}
        className="img absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64 -translate-x-[50%] -translate-y-[50%]"
        alt={`Image representing a link for ${heading}`}
      />

      <div
        // variants={{
        //   initial: {
        //     x: "25%",
        //     opacity: 0,
        //   },
        //   whileHover: {
        //     x: "0%",
        //     opacity: 1,
        //   },
        // }}
        // transition={{ type: "spring" }}
        className="arrow relative z-10 p-4 opacity-0 translateX-[25%]"
      >
        <FiArrowRight className="text-5xl text-neutral-50" />
      </div>
    </a>
  );
};
