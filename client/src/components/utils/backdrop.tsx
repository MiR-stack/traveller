import "@/styles/components/utils.scss";

interface backdropPropTypes {
  onClick?: () => void;
  opacity?: number;
  className?: string;
}

function Backdrop({ onClick, opacity = 0.315, className }: backdropPropTypes) {
  return (
    <div
      className={`backdrop ${className ? className : ""}`}
      style={{ backgroundColor: `rgba(0, 0, 0,${opacity})` }}
      onClick={onClick}
    />
  );
}

export default Backdrop;
