import React from "react";
import SectionLayout from "../../sectionLayout";
import Typography from "@/components/shared/typography";
import Link from "next/link";
import qs from "qs";
import { MASTER_TAG } from "@/utils/constants";
import { getStrapiData } from "@/utils";

const query = qs.stringify({
  populate: {
    blogs: { count: true },
  },
  fields: ["name", "slug", "icon"],
});

async function Categories() {
  const categoriesRes = await getStrapiData("categories", query, {
    tags: [MASTER_TAG, "categories"],
  });

  const categories = categoriesRes.data.reduce((acc: object[], item: any) => {
    const { name, slug, blogs } = item.attributes;
    const count = blogs.data.attributes.count;
    if (count < 1) return acc;
    acc.push({
      name,
      slug,
      count,
    });
    return acc;
  }, []);

  return (
    <SectionLayout title="categories">
      <div className="blog-sidebar-categories">
        {categories.slice(0, 5).map((category: any) => (
          <Link
            className="blog-sidebar-category link"
            href={`/search?cat=${category.slug}`}
            key={category.slug}
          >
            <Typography className="blog-sidebar-category--name" variant="body1">
              {category.name}
            </Typography>
            <Typography
              className="blog-sidebar-category--count"
              variant="body2"
            >
              {category.count}
            </Typography>
          </Link>
        ))}
      </div>
    </SectionLayout>
  );
}

export default Categories;
