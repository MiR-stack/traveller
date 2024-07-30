import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import Author from "@/components/pages/blog/author";
import { blogData } from "@/components/pages/blog/blog.data";
import BlogImage from "@/components/pages/blog/blogImage";
import Content from "@/components/pages/blog/content";
import Header from "@/components/pages/blog/header";
import RelatedBlogs from "@/components/pages/blog/relatedBlogs";
import Sidebar from "@/components/pages/blog/sidebar";
import { blogsData } from "@/components/pages/home/blogsData";
import Container from "@/components/shared/container";
import "@/styles/components/pages/blog.scss";
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

const breadcrumbs = [
  {
    name: "home",
    slug: "/",
  },
  {
    name: "europe",
    slug: "/?ct=europe",
  },
  { name: "spain" },
];

async function Page() {
  return (
    <div className="blog">
      <Navbar />
      <Container maxWidth="xlg">
        <Header
          breadcrumbs={breadcrumbs}
          readTime="3 minutes read"
          title={blogData.title}
          createdAt="january 21, 2022"
          country={blogData.country}
        />
        <BlogImage {...blogData.image} />
        <main className="blog-main">
          <Content content={blogData.content} author={blogData.author} />
          <Sidebar product={blogData.product} />
        </main>
      </Container>
      <Footer bg="bg2" />
    </div>
  );
}

export default Page;
