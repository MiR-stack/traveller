"use client";

import Typography from "@/components/shared/typography/typography";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Container from "@/components/shared/container";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { icons } from "@/components/utils/icons";
import { homeCategory } from "./categories";

function CategoriesSlider({ categories }: { categories: homeCategory[] }) {
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
              <Link
                href={`/search?cat=${category.slug}`}
                className="category__slide link"
              >
                {icons[category.icon as keyof typeof icons]}
                <div className="category__details">
                  <Typography className="category__blogs-count" variant="body2">
                    {category.count} destinations
                  </Typography>
                  <Typography
                    className="category__title"
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

export default CategoriesSlider;
