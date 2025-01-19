import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { fetchSeoData, getFormatedImage } from "@/utils";
import { getMetaData } from "@/utils/utils";
import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";

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

  const { seo, updatedAt } = seoData;
  if (!seo) return { title: "something went wrong" };

  return getMetaData(seo, updatedAt);
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
