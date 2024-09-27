import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop the Best Travel Gear and Accessories | unicorn",
  description:
    "Discover top-quality travel gear and accessories for your next adventure. Shop backpacks, luggage, outdoor equipment, and more to enhance your travel experience.",
  keywords: [
    "travel gear",
    "shop travel accessories",
    "best travel backpacks",
    "travel luggage",
    "outdoor equipment",
    "travel essentials",
    "adventure gear",
    "travel store",
    "buy travel products",
    "travel shop",
  ],
};

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer bg="bg2" />
    </div>
  );
}

export default layout;
