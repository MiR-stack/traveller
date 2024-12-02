import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { fetchSeoData, getFormatedImage, getStrapiData } from "@/utils";
import { TAGS } from "@/utils/constants";
import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import qs from "qs";

type Props = { params: { slug: string } };

type MetaSocial = {
  title: string;
  card?: string;
  description: string;
  images: string[];
  type?: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const seoData = await fetchSeoData(params.slug);
  if (!seoData) return { title: "Not Found" };

  const { seo, updatedAt, category } = seoData;
  if (!seo) return { title: "something went wrong" };

  const { metaTitle, metaDescription, metaImage, keywords, metaSocial } = seo;
  const image = getFormatedImage(metaImage!);

  const twitter = metaSocial?.find(
    (item: any) => item.socialNetwork === "Twitter"
  );
  const facebook = metaSocial?.find(
    (item: any) => item.socialNetwork === "Facebook"
  );

  // define default meta social
  const defaultMetaSocial: MetaSocial = {
    title: metaTitle,
    card: "summary_large_image",
    description: metaDescription,
    images: [image?.srcs.small || ""],
  };

  // creat meta for twitter
  let metaTwitter: Twitter = {
    ...defaultMetaSocial,
  };
  if (twitter) {
    const twitterImage = getFormatedImage(twitter.image);

    metaTwitter = {
      ...metaTwitter,
      title: twitter.title,
      description: twitter.description,
      images: [twitterImage?.srcs.medium || image?.srcs.small || ""],
    };
  }

  // create opengraph
  let openGraph: OpenGraph = {
    ...defaultMetaSocial,
    type: "article",
    publishedTime: updatedAt,
  };

  if (facebook) {
    const facebookImage = facebook ? getFormatedImage(facebook.image) : null;
    openGraph = {
      ...openGraph,
      title: facebook?.title,
      description: facebook?.description || metaDescription,
      images: [facebookImage?.srcs.small || image?.srcs.small || ""],
    };
  }

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    category: category?.name,
    openGraph,
    twitter: metaTwitter,
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

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="blog">
      <Navbar />
      {children}
      <Footer bg="bg2" />
    </div>
  );
};

export default layout;
