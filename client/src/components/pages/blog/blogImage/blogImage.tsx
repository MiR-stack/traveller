import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import { formatedImageTypes } from "@/types";

function BlogImage({ srcs: { main }, alt }: formatedImageTypes) {
  return (
    <CustomImage
      className="blog__image"
      src={main}
      alt={alt}
      priority
      sizes={`(max-width:1550px) 100vw, 1550px`}
    />
  );
}

export default BlogImage;
