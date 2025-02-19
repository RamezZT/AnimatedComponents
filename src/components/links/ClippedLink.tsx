import { AnimationOptions, useAnimate } from "framer-motion";
import { IconType } from "react-icons/lib";
import {
  SiAdobe,
  SiApple,
  SiFacebook,
  SiGoogle,
  SiLinkedin,
  SiShopify,
  SiSoundcloud,
  SiSpotify,
  SiTiktok,
} from "react-icons/si";

const TRANSITION: AnimationOptions = {
  duration: 0.2,
};

const TOP_RIGHT_CLIP = "polygon(0% 0%, 0% 100%, 100% 100%, 0% 100%)";
const NO_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0% 0%, 100% 0%, 0% 0%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0%, 100% 100%, 0% 100%)";
const TOP_LEFT_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 100% 0%)";
type keyFrameMap = {
  [key in Side]: string[];
};
const ENTERANCE_KEYFRAMES: keyFrameMap = {
  top: [TOP_LEFT_CLIP, NO_CLIP],
  bottom: [BOTTOM_LEFT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
};
const EXIT_KEYFRAMES: keyFrameMap = {
  top: [NO_CLIP, TOP_LEFT_CLIP],
  bottom: [NO_CLIP, BOTTOM_LEFT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
  left: [NO_CLIP, TOP_RIGHT_CLIP],
};

type Side = "left" | "right" | "bottom" | "top";

const ClippedGrid = () => {
  return (
    <div className="grid bg-white w-[1200px] h-[600px]">
      <div className="grid grid-cols-2">
        <ClippedLink Icon={SiApple}></ClippedLink>
        <ClippedLink Icon={SiAdobe}></ClippedLink>
      </div>
      <div className="grid grid-cols-4">
        <ClippedLink Icon={SiFacebook}></ClippedLink>
        <ClippedLink Icon={SiGoogle}></ClippedLink>
        <ClippedLink Icon={SiLinkedin}></ClippedLink>
        <ClippedLink Icon={SiShopify}></ClippedLink>
      </div>
      <div className="grid grid-cols-3">
        <ClippedLink Icon={SiSoundcloud}></ClippedLink>
        <ClippedLink Icon={SiSpotify}></ClippedLink>
        <ClippedLink Icon={SiTiktok}></ClippedLink>
      </div>
    </div>
  );
};

function getNearestSide(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  const box = e.target as HTMLDivElement;
  const rects = box.getBoundingClientRect();

  const { clientX: mousePositionX, clientY: mousePositionY } = e;

  const leftSide = {
    proximity: Math.abs(mousePositionX - rects.left),
    side: "left" as Side,
  };
  const rightSide = {
    proximity: Math.abs(mousePositionX - rects.right),
    side: "right" as Side,
  };
  const topSide = {
    proximity: Math.abs(mousePositionY - rects.top),
    side: "top" as Side,
  };
  const bottomSide = {
    proximity: Math.abs(mousePositionY - rects.bottom),
    side: "bottom" as Side,
  };

  return [leftSide, topSide, bottomSide, rightSide].sort(
    (a, b) => a.proximity - b.proximity
  )[0].side;
}

const ClippedLink = ({ Icon }: { Icon: IconType }) => {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  const handleAnimateEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const nearestSide = getNearestSide(e);

    const box = scope.current.querySelector(".box") as HTMLDivElement;
    animate(
      box,
      {
        clipPath: ENTERANCE_KEYFRAMES[nearestSide],
      },
      TRANSITION
    );
  };
  const handleAnimateExit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const nearestSide = getNearestSide(e);

    const box = scope.current.querySelector(".box") as HTMLDivElement;
    animate(
      box,
      {
        clipPath: EXIT_KEYFRAMES[nearestSide],
      },
      TRANSITION
    );
  };

  return (
    <div
      ref={scope}
      onMouseEnter={(e) => handleAnimateEnter(e)}
      onMouseLeave={(e) => handleAnimateExit(e)}
      className="relative bg border-2 hoverme cursor-pointer border-black flex justify-center items-center"
    >
      <Icon className="icon fill-black size-12" />
      <div
        style={{
          clipPath: BOTTOM_LEFT_CLIP,
        }}
        className="w-full h-full clip absolute box bg-black grid place-content-center"
      >
        <Icon className="icon fill-white size-12" />
      </div>
    </div>
  );
};

export default ClippedGrid;
