"use client";

import Typography from "@/components/shared/typography/typography";
import { Swiper, SwiperSlide } from "swiper/react";
import categoriesData from "./category.data";
import Container from "@/components/shared/container";
import Link from "next/link";
import { Autoplay } from "swiper/modules";

function Categories() {
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
          {categoriesData.map((category) => (
            <SwiperSlide key={category.title}>
              <Link href={category.slug} className="category-slide link">
                {category.icon}
                <div className="category-details">
                  <Typography className="category-blogsCount" variant="body2">
                    {category.count} destinations
                  </Typography>
                  <Typography className="category-title" variant="h4">
                    {category.title}
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
