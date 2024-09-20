import Brand from "@/components/shared/brand";
import Categories from "@/components/pages/home/categories";
import Hero from "@/components/pages/home/hero";
import LatestPosts from "@/components/pages/home/latestPosts";
import Products from "@/components/pages/home/products";
import SpecialPost from "@/components/pages/home/specialPost";
import SuggestedPlace from "@/components/pages/home/suggestedPlace";
import Newsletter from "@/components/shared/newsletter";
import "@/styles/components/pages/home.scss";
import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";

function page() {
  return (
    <div className="home">
      <Navbar extented={false} />
      <Brand isMoto variant="extended" />
      <Hero />
      <Categories />
      <LatestPosts />
      <SpecialPost />
      <Products />
      <SuggestedPlace />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default page;
