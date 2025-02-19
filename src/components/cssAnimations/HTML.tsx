import Edit from "../../assets/icons/Edit";
import Share from "../../assets/icons/Share";
import "./index.css";

const HTML = () => {
  return (
    <div className="relative bg-black size-96 rounded-full flex justify-center rot items-center">
      {/* Circles positioned at top, left, right, and bottom */}
      <span className="w-18 h-18 grid place-content-center bg-gray-300/85 rounded-full absolute left-[50%] -translate-x-[50%] top-0">
        <Edit />
      </span>
      <span className="w-18 h-18 grid place-content-center bg-gray-300/85 rounded-full absolute left-[80%] -translate-x-[50%] top-[13%]">
        <Share />
      </span>
      <span className="w-18 h-18 grid place-content-center bg-gray-300/85 rounded-full absolute left-[20%] -translate-x-[50%] top-[13%]"></span>
      <span className="w-18 h-18 grid place-content-center bg-gray-300/85 rounded-full absolute top-[50%] left-0 -translate-y-[50%] "></span>
      <span className="w-18 h-18 grid place-content-center bg-gray-300/85 rounded-full absolute top-[50%] -translate-y-[50%] left-[100%] -translate-x-[100%] "></span>
      <span className="w-18 h-18 grid place-content-center bg-gray-300/85 rounded-full absolute left-[80%] -translate-x-[50%] bottom-[13%]"></span>
      <span className="w-18 h-18 grid place-content-center bg-gray-300/85 rounded-full absolute left-[20%] -translate-x-[50%] bottom-[13%]"></span>
      <span className="w-18 h-18 grid place-content-center bg-gray-300/85 rounded-full absolute bottom-0 left-[50%] -translate-x-[50%]  "></span>

      {/* Inner div perfectly aligned with circles */}
      <div className="bg-white size-[240px] rounded-full"></div>
    </div>
  );
};

export default HTML;
