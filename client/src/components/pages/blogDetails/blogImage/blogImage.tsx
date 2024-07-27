import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import { imageTypes } from "@/types/blog.types";
import React from "react";

function BlogImage({ url, alt }: imageTypes) {
  return (
    <CustomImage
      className="blog_details-image"
      src={url}
      alt={alt}
      priority
      sizes={`(max-width:1550px) 100vw, 1550px`}
    />
  );
}

export default BlogImage;
