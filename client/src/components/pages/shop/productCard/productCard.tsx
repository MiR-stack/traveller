import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Typography from "@/components/shared/typography";
import { formatedImageTypes, imageTypes } from "@/types";
import Link from "next/link";
import React from "react";

interface productCardPropsType {
  price: {
    regular: number;
    discount: number | undefined;
  };
  name: string;
  image: formatedImageTypes;
  affiliates: {
    name: string;
    url: string;
  }[];
}

function ProductCard({ price, image, affiliates, name }: productCardPropsType) {
  return (
    <div className="shop-productCard">
      <CustomImage
        className="shop-productCard--image"
        src={image.srcs.thumbnail}
        alt={image.alt}
        sizes={`(min-width:600px) 30vw, (min-width:1200px) 20vw,45vw`}
      />
      <div className="shop-productCard--price price-active">
        {price.discount && price.discount < price.regular && (
          <Typography variant="body1"> ${price.discount} </Typography>
        )}
        <Typography
          className={`shop-productCard--price-regular ${
            price.discount && price.discount < price.regular
              ? "price-discount"
              : "price-active"
          }`}
          variant="body1"
        >
          ${price.regular}
        </Typography>
      </div>
      <Typography
        className="shop-productCard--name"
        variant="h4"
        component="h1"
      >
        {name}
      </Typography>
      <div className="shop-productCard--afiliates">
        <p className="shop-productCard--afiliates-title">
          check latest price on:
        </p>
        {affiliates.map((affilate) => (
          <Link
            className="shop-productCard--afiliates-btn link"
            href={affilate.url}
            target="blank"
            key={affilate.name}
          >
            {affilate.name}{" "}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
