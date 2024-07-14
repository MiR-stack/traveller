"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SectionLayout from "../sectionLayout";
import { blogsData } from "../blogsData";
import Card2 from "@/components/shared/cards/card2";
import Navigation from "@/components/utils/navigation";

function SuggestedPlace() {
  return (
    <SectionLayout
      title=" must visited place"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    >
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
        {blogsData.map((blog) => (
          <SwiperSlide key={blog.slug}>
            <Card2 {...blog} />
          </SwiperSlide>
        ))}
        <Navigation />
      </Swiper>
    </SectionLayout>
  );
}

export default SuggestedPlace;
