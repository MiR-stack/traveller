import { imageTypes } from "@/types/blog.types";
import { getDate, getFormatedImage, getStrapiData } from "@/utils";
import { MASTER_TAG } from "@/utils/constants";
import qs from "qs";
import suggestedPlace from ".";
import SectionLayout from "../sectionLayout";
import SuggestedPlaceSlider from "./suggestedPlaceSlider";

const QUERY = qs.stringify({
  populate: {
    images: {
      populate: "portrait",
    },
    destination: {
      fields: ["name"],
    },
  },
  fields: ["title", "slug", "createdAt"],
  filters: {
    isSuggested: {
      $eq: true,
    },
  },
  pagination: {
    start: 0,
    limit: 5,
  },
  sort: "updatedAt:desc",
});

export interface suggestedPlace {
  title: string;
  slug: string;
  createdAt: string;
  image: imageTypes;
  country: { name: string };
}

interface PlaceData {
  attributes: {
    title: string;
    slug: string;
    createdAt: string;
    images: {
      portrait: {
        data: any[];
      };
    };
    destination: {
      data?: {
        attributes: {
          name: string;
        };
      };
    };
  };
}

async function SuggestedPlace() {
  const { data } = await getStrapiData("blogs", QUERY, {
    tags: [MASTER_TAG, "suggestedPlace"],
  });

  const suggestedPlaces: suggestedPlace[] = data.map((place: PlaceData) => {
    const { title, slug, createdAt, images, destination } = place.attributes;
    const image = getFormatedImage({ data: images.portrait.data[0] });

    return {
      title,
      slug,
      createdAt: getDate(createdAt),
      image: { url: image?.srcs.medium, alt: image?.alt },
      country: { name: destination.data?.attributes.name || "world" },
    };
  });

  return (
    <SectionLayout
      title="Must-Visit Places"
      description="Discover breathtaking destinations that should be on every traveler's bucket list"
    >
      <SuggestedPlaceSlider places={suggestedPlaces} />
    </SectionLayout>
  );
}

export default SuggestedPlace;
