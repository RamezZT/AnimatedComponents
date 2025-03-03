import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col p-12 gap-12 ">
      <h1 className="text-5xl font-bold self-center">
        Welcome To BlueBox Components
      </h1>
      <div className="flex max-sm:flex-col self-center  text-2xl font-semibold gap-4">
        <Link
          to="mac"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          MacBook
        </Link>
        <Link
          to="modal"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Modal
        </Link>
        <Link
          to="appleButton"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Apple Button
        </Link>
        <Link
          to="testing"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Layout Animations
        </Link>
        <Link
          to="comparson-slider"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Comparison Slider
        </Link>
        <Link
          to="svg-lines"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          SVG Lines
        </Link>
      </div>
    </div>
  );
};

export default Home;
