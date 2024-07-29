import { blogsData } from "@/components/pages/home/blogsData";
import SectionLayout from "../../sectionLayout";
import Card3 from "@/components/shared/cards/card3";

function LatestPosts() {
  return (
    <SectionLayout title="latest posts">
      <div className="blog-sidebar-latest">
        {blogsData.slice(0, 4).map((blog) => (
          <Card3
            className={"blog-sidebar-latest-card"}
            {...blog}
            key={blog.slug}
            readTime="3 minute read"
          />
        ))}
      </div>
    </SectionLayout>
  );
}

export default LatestPosts;
