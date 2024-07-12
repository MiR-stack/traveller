import "@/styles/components/shared/container.scss";

interface containerPropTypes {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xlg";
  children: React.ReactNode;
}

function Container({ maxWidth = "lg", children }: containerPropTypes) {
  return (
    <div className={`container `}>
      <div className={`container-${maxWidth}`}>{children}</div>
    </div>
  );
}

export default Container;
