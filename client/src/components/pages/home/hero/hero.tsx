import { formatedImageTypes } from "@/types";
import { getFormatedImage, getStrapiData } from "@/utils";
import { TAGS } from "@/utils/constants";
import qs from "qs";
import HeroSlider from "./heroSlider";

const query = qs.stringify({
  populate: ["images.landscape"],
  fields: ["title", "description", "slug"],
  filters: {
    isFeatured: {
      $eq: true,
    },
  },
});

export interface heroSliderBlog {
  title: string;
  description: string;
  slug: string;
  image: formatedImageTypes;
}

async function Hero() {
  const { data } = await getStrapiData("blogs", query, {
    tags: [TAGS.MASTER_TAG, TAGS.HERO],
  });

  const heroData: heroSliderBlog[] = data?.map((item: any) => {
    return {
      title: item.attributes.title,
      description: item.attributes.description,
      slug: item.attributes.slug,
      image: getFormatedImage({
        data: item.attributes.images.landscape.data[0],
      }),
    };
  });

  return <HeroSlider data={heroData} />;
}

export default Hero;
