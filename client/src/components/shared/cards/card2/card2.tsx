import { basicBlogTypes } from "@/types/blog.types";
import Link from "next/link";
import React from "react";
import CustomImage from "../../bgImageContainer/bgImageContainer";
import Typography from "../../typography";
import Date from "../../date";
import "@/styles/components/shared/cards/card2.scss";

function Card2({ slug, image, title, createdAt, country }: basicBlogTypes) {
  return (
    <Link href={slug} className="card2">
      <CustomImage
        className="card2__image"
        src={image.url}
        alt={image.alt}
        sizes={`(max-width:600px) 45vw,(max-width:900px) 30vw, (max-width:1200px) 25vw, 20vw`}
      >
        <div className="card2__content">
          <Typography variant="body2" className="card2__country">
            {country.name}
          </Typography>
          <Typography className="card2__title" variant="h4" component="h2">
            {title}
          </Typography>
          <Date className="card2__date" date={createdAt || ""} />
        </div>
      </CustomImage>
    </Link>
  );
}

export default Card2;
