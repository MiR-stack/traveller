import Card1 from "@/components/shared/cards/card1";
import { blogsData } from "../../home/blogsData";
import SectionLayout from "../sectionLayout";

function RelatedBlogs() {
  return (
    <SectionLayout className="blog-related-container" title="related blogs">
      <div className="blog-related">
        {blogsData.slice(0, 3).map((blog) => (
          <Card1
            className="blog-related-card"
            key={blog.slug}
            {...blog}
            variant="related"
            readTime="4 minute read"
          />
        ))}
      </div>
    </SectionLayout>
  );
}

export default RelatedBlogs;
