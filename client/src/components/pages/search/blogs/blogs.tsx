import Card3 from "@/components/shared/cards/card3";
import Pagination from "@/components/shared/pagination";
import { Suspense } from "react";
import { getDate, getFormatedImage } from "@/utils";
import { paginationTypes } from "@/types";
import EmptyBlogs from "./emptyBlogs";

interface blogTypes {
  attributes: {
    title: string;
    slug: string;
    description: string;
    createdAt: string;
    readTime: string;
    images: {
      landscape: { data: any };
    };
  };
}

function Blogs({
  blogs,
  pagination,
}: {
  blogs: blogTypes[];
  pagination: paginationTypes;
}) {
  if (blogs.length < 1) return <EmptyBlogs />;

  const blogsData = blogs.map((blog) => {
    const { title, slug, description, createdAt, readTime, images } =
      blog.attributes;

    const image = getFormatedImage({ data: images.landscape.data[0] });
    const date = getDate(createdAt);
    return {
      title,
      slug,
      shortDescription: description,
      createdAt: date,
      readTime,
      image: {
        url: image?.srcs.thumbnail || "",
        alt: image?.alt || "",
      },
    };
  });

  return (
    <div className="search-blogs">
      <div className="search-blogs__wrapper">
        {blogsData.map((blog) => (
          <Card3
            key={blog.slug}
            {...blog}
            readTime="3 minutes read"
            variant="search"
            options={{ country: false, date: true, shortDescription: true }}
            imageSizes={`(min-width:600px) 200px,120px`}
          />
        ))}
      </div>
      {pagination.pageCount > 1 && (
        <Suspense fallback={<div>Loading...</div>}>
          <Pagination
            className="search-blogs__pagination"
            pageCount={pagination.pageCount}
            currentPage={pagination.page}
          />
        </Suspense>
      )}
    </div>
  );
}

export default Blogs;
