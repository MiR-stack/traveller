"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Card2 from "@/components/shared/cards/card2";
import Navigation from "@/components/utils/navigation";
import { suggestedPlace } from "./suggestedPlace";

function SuggestedPlaceSlider({ places }: { places: suggestedPlace[] }) {
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

export default SuggestedPlaceSlider;
