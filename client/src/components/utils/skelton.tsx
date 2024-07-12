import "@/styles/components/utils.scss";

interface skeltonPropTypes {
  shape?: "rectangle" | "round";
  className?: string;
  style?: React.CSSProperties;
  height?: string;
  width?: string;
}

function Skelton({
  shape = "rectangle",
  className,
  style,
  height,
  width,
}: skeltonPropTypes) {
  return (
    <div
      className={`skelton ${className}`}
      style={{
        borderRadius: shape == "round" ? "50%" : 0,
        height,
        width,
        ...style,
      }}
    ></div>
  );
}

export default Skelton;
