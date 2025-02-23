import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col p-12 gap-12">
      <h1 className="text-5xl font-bold self-center">
        Welcome To BlueBox Components
      </h1>
      <div className="flex self-center flex-1 text-2xl font-semibold gap-4">
        <a href="mac">MacBook</a>
        <a href="modal">modal</a>
        <a href="appleButton">Apple Button</a>
        <a href="testing">Layout animations</a>
      </div>
    </div>
  );
};

export default Home;
