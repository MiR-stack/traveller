import { blogsData } from "@/components/pages/home/blogsData";
import Categories from "@/components/pages/home/categories";
import Hero from "@/components/pages/home/hero";
import LatestPosts from "@/components/pages/home/latestPosts";
import Products from "@/components/pages/home/products";
import SpecialPost from "@/components/pages/home/specialPost";
import SuggestedPlace from "@/components/pages/home/suggestedPlace";
import "@/styles/components/pages/home.scss";

function page() {
  return (
    <div className="home">
      <Hero />
      <Categories />
      <LatestPosts />
      <SpecialPost {...blogsData[1]} />
      <Products />
      <SuggestedPlace />
    </div>
  );
}

export default page;
