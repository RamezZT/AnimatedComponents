import "./BubbleText.css";
const BubbleText = () => {
  const text = "BUBBBBBBBBBLEEEEEEE TEEEEEEXXXXTTTTTTT";
  return (
    <h2 className="text-center text-5xl font-extralight text-indigo-300">
      {text.split("").map((child, idx) => (
        <span className={"hoverText"} key={idx}>
          {child}
        </span>
      ))}
    </h2>
  );
};

export default BubbleText;
