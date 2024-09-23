import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { authorPropsType } from "@/components/pages/blog/author/author";
import BlogImage from "@/components/pages/blog/blogImage";
import Content from "@/components/pages/blog/content";
import Header from "@/components/pages/blog/header";
import Sidebar from "@/components/pages/blog/sidebar";
import Container from "@/components/shared/container";
import "@/styles/components/pages/blog.scss";
import { getDate, getFormatedImage, getStrapiData } from "@/utils";
import { strapiFieldsModifier } from "@/utils/utils";
import qs from "qs";

async function Page({ params }: { params: { slug: string } }) {
  const query = qs.stringify({
    populate: {
      images: {
        populate: ["landscape"],
      },
      product: {
        populate: ["image", "affiliates"],
        fields: ["name"],
      },

      destination: {
        populate: {
          continent: {
            fields: ["name", "slug"],
          },
        },
        fields: ["name", "slug"],
      },
      profile: {
        fields: ["name", "bio", "role"],
        populate: ["social_medias", "avatar"],
      },
      related_blogs: {
        populate: ["images.landscape", "destination"],
        fields: ["title", "slug", "createdAt", "readTime", "destination.name"],
        pagination: {
          limit: 3,
        },
      },
    },

    fields: ["title", "url", "createdAt", "readTime", "content"],
    filters: {
      slug: {
        $eq: params.slug,
      },
    },
  });

  const { data } = await getStrapiData("blogs", query);

  if (!data.length) {
    return <div>404 not found</div>;
  }

  const {
    title,
    url,
    destination,
    product,
    readTime,
    createdAt,
    images,
    content,
    profile,
    related_blogs,
  } = data[0].attributes;

  const date = getDate(createdAt);
  const image = getFormatedImage({ data: images.landscape.data[0] });

  const author = strapiFieldsModifier(profile.data, [
    "name",
    "bio",
    "role",
    "avatar",
    "social_medias",
  ]);

  return (
    <div className="blog">
      <Navbar />
      <Container maxWidth="xlg">
        <Header
          destination={destination}
          readTime={readTime}
          title={title}
          createdAt={date}
        />
        <BlogImage {...image!} />
        <main className="blog-main">
          <Content
            content={content}
            author={author as authorPropsType}
            url={url}
            title={title}
            blogs={related_blogs.data}
            id={data[0].id}
          />
          <Sidebar product={product} />
        </main>
      </Container>
      <Footer bg="bg2" />
    </div>
  );
}

export default Page;
