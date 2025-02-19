import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
export const NonStyledHoverImageLinks = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring" }}
    >
      <div>
        <Link
          heading="Blue Box"
          subheading="the simplest words hit the hardest"
          imgSrc="https://i.pinimg.com/736x/a9/8e/51/a98e515415e67afa9ecd985aec31ac1a.jpg"
          href="#"
        />
        <Link
          heading="AOT"
          subheading="Tatakeiii"
          imgSrc="https://i.pinimg.com/736x/43/7a/55/437a55cd40b4d3511536120677947946.jpg"
          href="#"
        />
        <Link
          heading="Daima"
          subheading="Yoshaaaaa!!"
          imgSrc="https://i.pinimg.com/736x/ab/5d/2e/ab5d2e7685a3bb76c927a86390658694.jpg"
          href="#"
        />
        <Link
          heading="Solo Leveling"
          subheading="I've been leveling up"
          imgSrc="https://i.pinimg.com/736x/20/b1/1a/20b11aa1187ad281328ff924a4282e72.jpg"
          href="#"
        />
        <Link
          heading="Death Note"
          subheading="Why r u looking at ur watch"
          imgSrc="https://i.pinimg.com/736x/84/3f/da/843fda6c9db013062519a19687bfd647.jpg"
          href="#"
        />
      </div>
    </motion.section>
  );
};

interface LinkProps {
  heading: string;
  imgSrc: string;
  subheading: string;
  href: string;
}

const Link = ({ heading, imgSrc, subheading, href }: LinkProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  return (
    <a href={href} ref={ref} className="flex items-center justify-around">
      <div>
        <span>{heading}</span>
        <span>{subheading}</span>
      </div>
      <img
        className="w-[200px]"
        src={imgSrc}
        alt={`Image representing a link for ${heading}`}
      />
      <div>
        <FiArrowRight />
      </div>
    </a>
  );
};
