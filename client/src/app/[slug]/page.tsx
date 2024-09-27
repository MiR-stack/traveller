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
import { MASTER_TAG } from "@/utils/constants";
import { strapiFieldsModifier } from "@/utils/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import qs from "qs";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const seoData = await fetchSeoData(params.slug);
  if (!seoData) return { title: "Not Found" };

  const { seo, updatedAt, category } = seoData;
  if (!seo) return { title: "something went wrong" };

  const { metaTitle, metaDescription, metaImage, keywords, metaSocial } = seo;
  const image = getFormatedImage(metaImage!);

  const twitter = metaSocial.find(
    (item: any) => item.socialNetwork === "Twitter"
  );
  const facebook = metaSocial.find(
    (item: any) => item.socialNetwork === "Facebook"
  );

  const twitterImage = twitter ? getFormatedImage(twitter.image) : null;
  const facebookImage = facebook ? getFormatedImage(facebook.image) : null;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    category: category?.name,
    openGraph: {
      title: facebook?.title,
      description: facebook?.description || metaDescription,
      type: "article",
      publishedTime: updatedAt,
      images: [facebookImage?.srcs.small || image?.srcs.small || ""],
    },
    twitter: {
      title: twitter?.title,
      card: "summary_large_image",
      description: twitter?.description,
      images: [twitterImage?.srcs.medium || image?.srcs.small || ""],
    },
    verification: {
      google: "google",
      yandex: "yandex",
      yahoo: "yahoo",
      other: {
        me: ["habibmir811@gmail.com"],
      },
    },
  };
}

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
            author={author}
            url={url}
            title={title}
            blogs={related_blogs.data}
            id={blogData.id}
          />
          <Sidebar product={product} />
        </main>
      </Container>
      <Footer bg="bg2" />
    </div>
  );
}

async function fetchSeoData(slug: string) {
  const seoQuery = qs.stringify({
    populate: {
      seo: {
        populate: ["metaSocial.image", "metaImage"],
      },
      category: {
        fields: ["name"],
      },
    },
    fields: ["slug", "updatedAt"],
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  const { data } = await getStrapiData("blogs", seoQuery, {
    tags: [MASTER_TAG, slug, "blogs"],
  });

  return data[0]?.attributes;
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
    fields: ["title", "url", "createdAt", "readTime", "content"],
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  const { data } = await getStrapiData("blogs", query, {
    tags: [MASTER_TAG, slug, "blogs"],
  });

  return data[0];
}

export default Page;
