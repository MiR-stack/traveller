import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import Brand from "@/components/shared/brand";
import { getStrapiData } from "@/utils";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `Contact us `,
    description: "If you have any travel releted questions. please contact us",
    keywords: [
      "traveller",
      "travelker contact form",
      "travel guides",
      "travel advice",
    ],
  };
};

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar extented={false} />
      <Brand />
      {children}
      <Footer bg="bg2" />
    </div>
  );
}

export default layout;
