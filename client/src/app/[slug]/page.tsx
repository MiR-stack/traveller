import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import BlogImage from "@/components/pages/blogDetails/blogImage";
import { blogsData } from "@/components/pages/home/blogsData";
import Container from "@/components/shared/container";
import "@/styles/components/pages/blogDetails.scss";
import { queryTypes } from "@/types";
import { getBlog } from "@/utils";

const queryObj: queryTypes = {
  fields: ["title", "content", "url"],
  populate: {
    country: {
      fields: ["name"],
    },
    image: true,
  },
};

async function Page() {
  const blog = blogsData[2];

  const Blog = await getBlog({ slug: "", queryObj });

  return (
    <>
      <Navbar />
      <Container maxWidth="xlg">
        <BlogImage {...blog.image} />
        <main></main>
      </Container>
      <Footer />
    </>
  );
}

export default Page;
