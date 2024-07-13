import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

function CustomImage({
  children,
  height,
  width,
  src,
  alt,
  priority = false,
  className,
  sizes,
  style,
  placeholder,
  blurDataURL,
  loading,
}: {
  children?: React.ReactNode;
  height?: string;
  width?: string;
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  style?: React.CSSProperties;
  placeholder?: PlaceholderValue;
  blurDataURL?: string;
  loading?: "lazy";
}) {
  return (
    <div
      className={className}
      style={{ height, width, position: "relative", ...style }}
    >
      <Image
        alt={alt}
        src={src}
        fill
        sizes={sizes}
        priority={priority}
        style={{
          objectFit: "cover",
        }}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
      />
      {children}
    </div>
  );
}

export default CustomImage;
