import SectionLayout from "@/components/pages/home/sectionLayout/sectionLayout";
import Card1 from "@/components/shared/cards/card1/card1";
import { getFormatedImage, getStrapiData } from "@/utils";
import qs from "qs";

const query = qs.stringify({
  populate: {
    destination: {
      fields: ["name"],
    },
    categories: {
      fields: ["name"],
    },
    images: {
      populate: "landscape",
    },
  },
  fields: ["title", "slug"],
  pagination: {
    start: 0,
    limit: 6,
  },
  sort: "createdAt:desc",
});

async function LatestPosts() {
  const blogs = await getStrapiData("blogs", query, { cache: "no-store" });

  const latestBlogs = blogs.data.map((blog: any) => {
    const { title, slug, destination, categories, images } = blog.attributes;

    const image = getFormatedImage({ data: images.landscape.data[0] });
    return {
      title,
      slug,
      destination: destination.data?.attributes.name || "world",
      category: categories.data[0].attributes.name,
      image: { url: image?.srcs.medium, alt: image?.alt },
    };
  });
  return (
    <SectionLayout
      title="latest posts"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut sed do eiusmod tempor"
      background="bg2"
    >
      <div className="latest_posts-container">
        {latestBlogs.slice(0, 6).map((blog: any) => (
          <Card1
            className="latest_posts-blog"
            key={blog.slug}
            title={blog.title}
            slug={blog.slug}
            image={blog.image}
            country={{ name: blog.destination }}
            category={{ name: blog.category }}
          />
        ))}
      </div>
    </SectionLayout>
  );
}

export default LatestPosts;
