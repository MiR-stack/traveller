import SectionLayout from "../../sectionLayout";
import Card3 from "@/components/shared/cards/card3";
import { getFormatedImage, getStrapiData } from "@/utils";
import qs from "qs";

const query = qs.stringify({
  populate: {
    destination: {
      fields: ["name"],
    },
    images: {
      populate: "landscape",
    },
  },
  fields: ["title", "slug", "readTime"],
  pagination: {
    start: 0,
    limit: 4,
  },
  sort: "createdAt:desc",
});
async function LatestPosts() {
  const blogs = await getStrapiData("blogs", query, { revalidate: 3600 });

  const latestBlogs = blogs.data.map((blog: any) => {
    const { title, slug, destination, images, readTime } = blog.attributes;

    const image = getFormatedImage({ data: images.landscape.data[0] });
    return {
      title,
      slug,
      readTime,
      country: { name: destination.data?.attributes.name || "world" },
      image: { url: image?.srcs.medium, alt: image?.alt },
    };
  });

  return (
    <SectionLayout title="latest posts">
      <div className="blog-sidebar-latest">
        {latestBlogs.slice(0, 4).map((blog: any) => (
          <Card3
            className={"blog-sidebar-latest-card"}
            {...blog}
            key={blog.slug}
            readTime={blog.readTime + " minutes read"}
          />
        ))}
      </div>
    </SectionLayout>
  );
}

export default LatestPosts;
