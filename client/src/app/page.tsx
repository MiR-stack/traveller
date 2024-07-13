import Categories from "@/components/pages/home/categories";
import Hero from "@/components/pages/home/hero";
import "@/styles/components/pages/home.scss";

function page() {
  return (
    <div className="home">
      <Hero />
      <Categories />
    </div>
  );
}

export default page;
