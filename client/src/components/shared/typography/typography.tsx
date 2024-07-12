import React from "react";
import constants from "@/styles/base/_constant.module.scss";

const variants = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body1: "p",
};

interface typographyProps {
  component?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
}

function Typography({
  component,
  className,
  children,
  variant,
}: typographyProps) {
  let Tag = variant as keyof JSX.IntrinsicElements;

  if (component) {
    Tag = component;
  }

  return (
    <Tag
      className={`${constants.brandName}-${variant} ${
        className ? className : ""
      }`}
    >
      {children}
    </Tag>
  );
}

export default Typography;
