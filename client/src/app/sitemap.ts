import { getStrapiData } from "@/utils";
import { TAGS } from "@/utils/constants";
import type { MetadataRoute } from "next";
import qs from "qs";

const query = qs.stringify({
  fields: ["url", "updatedAt"],
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await getStrapiData("blogs", query, {
    tags: [TAGS.MASTER_TAG, TAGS.BLOGS],
  });

  let map: MetadataRoute.Sitemap = [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const blogsMap = data.map((item: any) => {
    const { url, updatedAt } = item.attributes;
    return {
      url,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 1,
    };
  });

  return [...map, ...blogsMap];
}
