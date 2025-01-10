"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Backdrop from "@/components/utils/backdrop";
import Typography from "@/components/shared/typography/typography";
import { GoArrowUpRight } from "react-icons/go";
import Navigation from "../../../utils/navigation";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import { heroSliderBlog } from "./hero";
import Link from "next/link";

interface heroSliderProps {
  data: heroSliderBlog[];
}

const HeroSlider = ({ data }: heroSliderProps) => {
  const router = useRouter();

  return (
    <section className="hero">
      <Swiper
        className="hero__slider"
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
        <Navigation className="hero__navigation" />
        {data.map((blog: heroSliderBlog) => (
          <SwiperSlide key={blog.slug}>
            <CustomImage
              className="hero__image"
              src={blog.image.srcs.main}
              alt={blog.image.alt}
              priority
              sizes={`(max-width:1550px) 100vw, 1550px,`}
            >
              <div className="hero__content">
                <Typography className="hero__title" variant="h1" component="h2">
                  {blog.title}
                </Typography>
                <Typography variant="body2" className="hero__description">
                  {blog.description}
                </Typography>
                <Link
                  className="hero__btn"
                  href={`/${blog.slug}`}
                  aria-label="read full article"
                >
                  read more <span className="text--hiden"> blogs</span>{" "}
                  <GoArrowUpRight />
                </Link>
              </div>
              <Backdrop className="hero__backdrop" opacity={0.2} />
            </CustomImage>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
