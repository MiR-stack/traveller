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
import { useGetDataQuery } from "@/store/api/strapiApi";
import Skeleton from "@/components/utils/skeleton";
import qs from "qs";
import { getFormatedImage } from "@/utils";

const query = qs.stringify({
  populate: ["images.landscape"],
  fields: ["title", "description", "slug"],
  filters: {
    isFeatured: {
      $eq: true,
    },
  },
});

const Hero = () => {
  const router = useRouter();
  const { data, isLoading } = useGetDataQuery({
    path: "blogs",
    query,
  });

  if (isLoading)
    return (
      <div className="bg--1">
        <Skeleton className="hero__skeleton" variant="rectangle" />
      </div>
    );

  const heroData = data?.data.map((item: any) => {
    return {
      title: item.attributes.title,
      description: item.attributes.description,
      slug: item.attributes.slug,
      image: getFormatedImage({
        data: item.attributes.images.landscape.data[0],
      }),
    };
  });

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
        {heroData.map((blog: any) => (
          <SwiperSlide key={blog.slug}>
            <CustomImage
              className="hero__image"
              src={blog.image.srcs.main}
              alt={blog.image.alt}
              priority
              sizes={`(min-width:1550px) 1550px, 100vw`}
            >
              <div className="hero__content">
                <Typography className="hero__title" variant="h1">
                  {blog.title}{" "}
                </Typography>
                <Typography variant="body2" className="hero__description">
                  {blog.shortDescription}{" "}
                </Typography>
                <button
                  className="hero__btn btn"
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
