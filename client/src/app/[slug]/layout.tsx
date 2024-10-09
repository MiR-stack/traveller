import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { getFormatedImage, getStrapiData } from "@/utils";
import { TAGS } from "@/utils/constants";
import { Metadata } from "next";
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
    tags: [TAGS.MASTER_TAG, slug],
  });

  return data[0]?.attributes;
}
