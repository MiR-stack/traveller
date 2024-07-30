import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import React from "react";
import { blogData } from "../blog.data";

function BlogImage({ src, alt }: typeof blogData.image) {
  return (
    <CustomImage
      className="blog-image"
      src={src}
      alt={alt}
      priority
      sizes={`(max-width:1550px) 100vw, 1550px`}
    />
  );
}

export default BlogImage;
