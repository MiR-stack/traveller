import Card3 from "@/components/shared/cards/card3";
import { blogsData } from "../../home/blogsData";
import Pagination from "@/components/shared/pagination";
import { Suspense } from "react";

function Blogs() {
  return (
    <div className="search-blogs-conatainer">
      <div className="search-blogs">
        {blogsData.map((blog) => (
          <Card3
            key={blog.slug}
            {...blog}
            readTime="3 minutes read"
            variant="search"
            className="search-blogCard"
            options={{ country: false, date: true, shortDescription: true }}
            imageSizes={`(min-width:600px) 200px,120px`}
          />
        ))}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Pagination
          className="search-blogs-pagination"
          pageCount={5}
          currentPage={1}
          totalPage={9}
        />
      </Suspense>
    </div>
  );
}

export default Blogs;
