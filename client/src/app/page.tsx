import Categories from "@/components/pages/home/categories";
import Hero from "@/components/pages/home/hero";
import LatestPosts from "@/components/pages/home/latestPosts";
import "@/styles/components/pages/home.scss";

function page() {
  return (
    <div className="home">
      <Hero />
      <Categories />
      <LatestPosts />
    </div>
  );
}

export default page;
