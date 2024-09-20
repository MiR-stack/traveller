import "@/styles/components/shared/skeleton.scss";

interface SkeletonPropTypes {
  variant: "text" | "rectangle" | "circle";
  height?: string;
  width?: string;
  className?: string;
  effect?: "pulse" | "wave" | "none";
  style?: React.CSSProperties;
}

function Skeleton({
  variant = "text",
  height,
  width,
  className,
  effect = "pulse",
  style,
}: SkeletonPropTypes) {
  return (
    <div
      className={`skeleton skeleton--${variant} skeleton--effect-${effect} ${
        className ?? className
      }`}
      style={{ height, width, ...style }}
    ></div>
  );
}

export default Skeleton;
