import React from "react";
import SectionLayout from "../../sectionLayout";
import Typography from "@/components/shared/typography";
import Link from "next/link";

const categories = [
  {
    name: "adventure",
    slug: "adventure",
    count: 43,
  },
  {
    name: "popular",
    slug: "popular",
    count: 65,
  },
  {
    name: "camp",
    slug: "camp",
    count: 3,
  },
  {
    name: "beaches",
    slug: "beaches",
    count: 7,
  },
  {
    name: "treking",
    slug: "treking",
    count: 23,
  },
];

function Categories() {
  return (
    <SectionLayout title="categories">
      <div className="blog-sidebar-categories">
        {categories.map((categorie) => (
          <Link
            className="blog-sidebar-category link"
            href={`/search?cat=${categorie.slug}`}
            key={categorie.slug}
          >
            <Typography className="blog-sidebar-category--name" variant="body1">
              {categorie.name}
            </Typography>
            <Typography
              className="blog-sidebar-category--count"
              variant="body2"
            >
              {categorie.count}
            </Typography>
          </Link>
        ))}
      </div>
    </SectionLayout>
  );
}

export default Categories;
