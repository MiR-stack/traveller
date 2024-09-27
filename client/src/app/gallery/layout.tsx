import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import Brand from "@/components/shared/brand";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stunning Travel Photography Gallery | traveller",
  description:
    "Explore breathtaking travel photos from around the world. Discover stunning landscapes, cultural snapshots, and inspiring images to fuel your wanderlust.",
  keywords: [
    "travel photography",
    "stunning landscapes",
    "cultural snapshots",
    "inspiring images",
    "wanderlust",
    "travel gallery",
    "travel photos",
  ],
};

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar extented={false} />
      <Brand isMoto />
      {children}
      <Footer bg="bg2" />
    </div>
  );
}

export default layout;
