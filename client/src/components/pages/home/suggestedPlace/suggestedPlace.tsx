"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SectionLayout from "../sectionLayout";
import Card2 from "@/components/shared/cards/card2";
import Navigation from "@/components/utils/navigation";
import { useGetDataQuery } from "@/store/api/strapiApi";
import qs from "qs";
import { imageTypes } from "@/types/blog.types";
import { getDate, getFormatedImage } from "@/utils";
import Skeleton from "@/components/utils/skeleton";
import { useMemo } from "react";

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

interface SuggestedPlace {
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

function SuggestedPlace() {
  const { data, isLoading } = useGetDataQuery({ path: "blogs", query: QUERY });

  const suggestedPlaces = useMemo(() => {
    if (!data?.data) return [];

    return data.data.map((place: PlaceData) => {
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
  }, [data]);

  return (
    <SectionLayout
      title="Must-Visit Places"
      description="Discover breathtaking destinations that should be on every traveler's bucket list"
    >
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <SuggestedPlacesSwiper places={suggestedPlaces} />
      )}
    </SectionLayout>
  );
}

function SkeletonLoader() {
  return (
    <div className="wraper card2__skeleton-wrapper">
      {Array.from({ length: 5 }, (_, index) => (
        <Skeleton key={index} className="card2__skeleton" variant="rectangle" />
      ))}
    </div>
  );
}

function SuggestedPlacesSwiper({ places }: { places: SuggestedPlace[] }) {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={15}
      breakpoints={{
        900: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1500: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      }}
    >
      {places.map((place) => (
        <SwiperSlide key={place.slug}>
          <Card2 {...place} />
        </SwiperSlide>
      ))}
      <Navigation />
    </Swiper>
  );
}

export default SuggestedPlace;
