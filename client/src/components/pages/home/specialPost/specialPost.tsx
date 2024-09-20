import CustomImage from "@/components/shared/bgImageContainer";
import Date from "@/components/shared/date";
import Typography from "@/components/shared/typography";
import { basicBlogTypes } from "@/types/blog.types";
import Link from "next/link";
import { getFormatedImage, getStrapiData } from "@/utils";
import qs from "qs";
import { getDate } from "@/utils";
import { MASTER_TAG } from "@/utils/constants";

const query = qs.stringify({
  fields: ["title", "slug", "createdAt"],
  populate: "images.landscape",
  filters: {
    isSpecial: {
      $eq: true,
    },
  },
  sort: "updatedAt:desc",
});

async function SpecialPost() {
  const blog = await getStrapiData("blogs", query, {
    tags: [MASTER_TAG, "specialPost"],
  });

  if (!blog.data.length) return null;

  const { title, slug, createdAt, images } = blog.data[0].attributes;

  const image = getFormatedImage({ data: images.landscape.data[0] });

  const date = getDate(createdAt);

  return (
    <section className="special_post">
      <CustomImage
        className="special_post-image"
        src={image?.srcs.main || ""}
        alt={image?.alt || "special post image"}
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
          <Date className="special_post-content-date" date={date} />
          <Link className="special_post-content-button link" href={slug}>
            read post
          </Link>
        </div>
      </CustomImage>
    </section>
  );
}

export default SpecialPost;
