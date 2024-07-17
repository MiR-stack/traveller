"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { heroData } from "./heroData";
import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Backdrop from "@/components/utils/backdrop";
import Typography from "@/components/shared/typography/typography";
import { GoArrowUpRight } from "react-icons/go";
import Navigation from "../../../utils/navigation";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="hero">
      <Swiper
        className="hero-slider"
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[Pagination, EffectFade, Autoplay]}
        effect="fade"
      >
        <Navigation />
        {heroData.map((blog) => (
          <SwiperSlide key={blog.slug}>
            <CustomImage
              className="hero-image"
              src={blog.image.url}
              alt={blog.image.alt}
              priority
              sizes={`(min-width:1550px) 1550px, 100vw`}
            >
              <div className="hero-content">
                <Typography className="hero-content--title" variant="h1">
                  {blog.title}{" "}
                </Typography>
                <Typography
                  variant="body2"
                  className="hero-content--short_description"
                >
                  {blog.shortDescription}{" "}
                </Typography>
                <button
                  className="hero-btn btn"
                  onClick={() => router.push(blog.slug)}
                >
                  read more <GoArrowUpRight />
                </button>
              </div>
              <Backdrop opacity={0.2} />
            </CustomImage>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
