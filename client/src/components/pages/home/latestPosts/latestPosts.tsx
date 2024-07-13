import SectionLayout from "@/components/pages/home/sectionLayout/sectionLayout";
import { blogsData } from "../blogsData";
import Card1 from "@/components/shared/cards/card1/card1";

function LatestPosts() {
  return (
    <SectionLayout
      title="latest posts"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut sed do eiusmod tempor"
      background="bg2"
    >
      <div className="latest_posts-container">
        {blogsData.slice(0, 6).map((blog) => (
          <Card1 className="latest_posts-blog" key={blog.slug} {...blog} />
        ))}
      </div>
    </SectionLayout>
  );
}

export default LatestPosts;
