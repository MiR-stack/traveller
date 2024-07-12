import variables from "@/styles/base/_constant.module.scss";
import "@/styles/components/shared/divider.scss";

interface dividerPropTypes {
  direction?: "horizontal" | "verticale";
  size: number;
  className?: string;
}

function Divider({
  direction = "horizontal",
  size,
  className,
}: dividerPropTypes) {
  return (
    <div
      className={`${variables.brandName}-divider ${
        variables.brandName
      }-divider--${direction} ${className ? className : ""}`}
      style={
        direction === "horizontal"
          ? { width: `${size}px` }
          : { height: `${size}px` }
      }
    />
  );
}

export default Divider;
