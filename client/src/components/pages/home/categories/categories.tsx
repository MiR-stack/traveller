import { getStrapiData } from "@/utils";
import { MASTER_TAG } from "@/utils/constants";
import qs from "qs";
import CategoriesSlider from "./categoriesSlide";

const query = qs.stringify({
  populate: {
    blogs: { count: true },
  },
  fields: ["name", "slug", "icon"],
});

export interface homeCategory {
  name: string;
  slug: string;
  icon: string;
  count: number;
}

async function Categories() {
  const { data } = await getStrapiData("categories", query, {
    tags: [MASTER_TAG, "category"],
  });
  const categories: homeCategory[] = data?.map((item: any) => {
    const { name, slug, icon, blogs } = item.attributes;
    return {
      name,
      slug,
      icon,
      count: blogs.data.attributes.count,
    };
  });
  return <CategoriesSlider categories={categories} />;
}

export default Categories;
