"use client";

import Typography from "@/components/shared/typography/typography";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Container from "@/components/shared/container";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { useGetDataQuery } from "@/store/api/strapiApi";
import qs from "qs";
import Skeleton from "@/components/utils/skeleton";
import { icons } from "@/components/utils/icons";

const query = qs.stringify({
  populate: {
    blogs: { count: true },
  },
  fields: ["name", "slug", "icon"],
});

function Categories() {
  const { data, isLoading } = useGetDataQuery({
    path: "categories",
    query,
  });

  if (isLoading)
    return (
      <div className="bg--1">
        <Container maxWidth="xlg">
          <div className="category-skeleton-wraper">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="category-skeleton"
                  variant="rectangle"
                  effect="wave"
                />
              ))}
          </div>
        </Container>
      </div>
    );

  const categories = data?.data.map((item: any) => {
    const { name, slug, icon, blogs } = item.attributes;
    return {
      name,
      slug,
      icon,
      count: blogs.data.attributes.count,
    };
  });

  return (
    <section className="category">
      <Container maxWidth="xlg">
        <Swiper
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          slidesPerView={3}
          spaceBetween={20}
          modules={[Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
            1500: {
              slidesPerView: 6,
              spaceBetween: 40,
            },
          }}
        >
          {categories.map((category: any) => (
            <SwiperSlide key={category.name}>
              <Link href={category.slug} className="category-slide link">
                {icons[category.icon as keyof typeof icons]}
                <div className="category-details">
                  <Typography className="category-blogsCount" variant="body2">
                    {category.count} destinations
                  </Typography>
                  <Typography
                    className="category-title"
                    variant="h4"
                    component="h2"
                  >
                    {category.name}
                  </Typography>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}

export default Categories;
