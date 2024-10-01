import Card1 from "@/components/shared/cards/card1";
import SectionLayout from "../sectionLayout";
import { strapiDataResTypes } from "@/types";
import { getDate, getFormatedImage, getStrapiData } from "@/utils";
import qs from "qs";

async function RelatedBlogs({
  blogs = [],
  id,
}: {
  blogs: strapiDataResTypes[];
  id: number;
}) {
  const expectedBlogsLength = 3;
  let blogsData = blogs.map(formatBlogData);

  if (blogsData.length < expectedBlogsLength) {
    const existingIds = blogs.map((blog) => blog.id);
    existingIds.push(id);

    const query = qs.stringify({
      populate: ["images.landscape", "destination"],
      fields: ["title", "slug", "createdAt", "readTime"],
      pagination: {
        limit: 10, // Fetch more than needed to ensure we have enough unique blogs
      },
      filters: {
        id: {
          $notIn: existingIds,
        },
      },
    });

    const fetchMoreBlogs = await getStrapiData("blogs", query, {
      cache: "no-store",
    });

    const additionalBlogs = fetchMoreBlogs.data
      .filter((blog: strapiDataResTypes) => !existingIds.includes(blog.id))
      .slice(0, expectedBlogsLength - blogsData.length);

    blogsData = [...blogsData, ...additionalBlogs.map(formatBlogData)];
  }

  return (
    <SectionLayout className="related-blog" title="related blogs">
      <div className="related-blog__wrapper">
        {blogsData.slice(0, expectedBlogsLength).map((blog) => (
          <Card1
            className="related-blog__card"
            key={blog.slug}
            {...blog}
            variant="related"
            readTime={blog.readTime + " minute read"}
          />
        ))}
      </div>
    </SectionLayout>
  );
}

function formatBlogData(blog: strapiDataResTypes) {
  const { title, slug, destination, images, readTime, createdAt } =
    blog.attributes;

  const image = getFormatedImage({ data: images.landscape.data[0] });
  const date = getDate(createdAt);

  return {
    title,
    slug,
    country: destination.data?.attributes.name || "world",
    image: { url: image?.srcs.medium || "", alt: image?.alt || "" },
    readTime,
    createdAt: date,
  };
}

export default RelatedBlogs;
