import CustomImage from "@/components/shared/bgImageContainer";
import Date from "@/components/shared/date";
import Typography from "@/components/shared/typography";
import { basicBlogTypes } from "@/types/blog.types";
import Link from "next/link";

function SpecialPost({ title, slug, createdAt, image }: basicBlogTypes) {
  return (
    <section className="special_post">
      <CustomImage
        className="special_post-image"
        src={image.url}
        alt={image.alt}
        sizes={`(min-width:1440px) 80vw, 100vw`}
        priority
      >
        <div className="special_post-content">
          <Typography
            className="special_post-content-title"
            variant="h2"
            component="h1"
          >
            {title}
          </Typography>
          <Date className="special_post-content-date" date={createdAt} />
          <Link className="special_post-content-button link" href={slug}>
            read post
          </Link>
        </div>
      </CustomImage>
    </section>
  );
}

export default SpecialPost;
