import { authorPropsType } from "@/components/pages/blog/author/author";
import BlogImage from "@/components/pages/blog/blogImage";
import Content from "@/components/pages/blog/content";
import Header from "@/components/pages/blog/header";
import Sidebar from "@/components/pages/blog/sidebar";
import Container from "@/components/shared/container";
import "@/styles/components/pages/blog.scss";
import {
  generateJsonLD,
  getDate,
  getFormatedImage,
  getStrapiData,
} from "@/utils";
import { TAGS } from "@/utils/constants";
import { fetchSeoData, strapiFieldsModifier } from "@/utils/utils";
import { notFound } from "next/navigation";
import qs from "qs";

type Props = { params: { slug: string } };

async function Page({ params }: Props) {
  const blogData = await fetchBlogData(params.slug);
  if (!blogData) notFound();

  const {
    title,
    url,
    destination,
    product,
    readTime,
    createdAt,
    updatedAt,
    description,
    images,
    content,
    profile,
    related_blogs,
  } = blogData.attributes;

  const date = getDate(createdAt);
  const image = getFormatedImage({ data: images.landscape.data[0] });
  const author = strapiFieldsModifier(profile.data, [
    "name",
    "bio",
    "role",
    "avatar",
    "social_medias",
  ]) as authorPropsType;

  // creating json ld
  const seoData = await fetchSeoData(params.slug);

  const { seo } = seoData;

  const { metaTitle, metaDescription, metaImage, keywords } = seo;
  const MetaImage = getFormatedImage(metaImage!);

  const jsonLd = generateJsonLD({
    headline: metaTitle || title,
    updatedAt,
    createdAt,
    description: metaDescription || description,
    image: MetaImage?.srcs.small || image?.srcs.small || "",
    keywords,
    url,
    authorName: author.name,
  });

  return (
    <Container maxWidth="xlg">
      <Header
        destination={destination}
        readTime={readTime}
        title={title}
        createdAt={date}
      />
      <BlogImage {...image!} />
      <main className="blog__main">
        <Content
          content={content}
          author={author}
          url={url}
          title={title}
          blogs={related_blogs.data}
          id={blogData.id}
        />
        <Sidebar product={product} />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Container>
  );
}

async function fetchBlogData(slug: string) {
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
    fields: [
      "title",
      "description",
      "url",
      "createdAt",
      "updatedAt",
      "readTime",
      "content",
    ],
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  const { data } = await getStrapiData("blogs", query, {
    tags: [TAGS.MASTER_TAG, slug],
  });

  return data[0];
}

export default Page;
