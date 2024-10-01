import { use } from "react";
import SectionLayout from "@/components/pages/home/sectionLayout/sectionLayout";
import Card1 from "@/components/shared/cards/card1/card1";
import { getFormatedImage, getStrapiData } from "@/utils";
import qs from "qs";

interface BlogData {
  title: string;
  slug: string;
  destination: string;
  category: string;
  image: {
    url: string;
    alt: string;
  };
}

const QUERY = qs.stringify({
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

const fetchLatestBlogs = async (): Promise<BlogData[]> => {
  const blogs = await getStrapiData("blogs", QUERY, { revalidate: 3600 });

  return blogs.data.map((blog: any) => {
    const { title, slug, destination, categories, images } = blog.attributes;
    const image = getFormatedImage({ data: images.landscape.data[0] });
    return {
      title,
      slug,
      destination: destination.data?.attributes.name || "world",
      category: categories.data[0]?.attributes.name || "Uncategorized",
      image: { url: image?.srcs.medium || "", alt: image?.alt || "" },
    };
  });
};

export default function LatestPosts() {
  const latestBlogs = use(fetchLatestBlogs());

  return (
    <SectionLayout
      title="Latest Posts"
      description="Explore our most recent travel stories and adventures from around the world."
      background="bg2"
    >
      <div className="latest-posts__container">
        {latestBlogs.map((blog: BlogData) => (
          <Card1
            className="latest-posts__blog"
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
