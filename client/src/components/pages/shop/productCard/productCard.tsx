import React from "react";
import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Typography from "@/components/shared/typography";
import { formatedImageTypes } from "@/types";
import Link from "next/link";

interface Price {
  regular: number;
  discount?: number;
}

interface Affiliate {
  name: string;
  url: string;
}

interface ProductCardProps {
  price: Price;
  name: string;
  image: formatedImageTypes | null;
  affiliates: Affiliate[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  price,
  image,
  affiliates,
  name,
}) => {
  const hasDiscount = price.discount && price.discount < price.regular;

  const renderPrice = () => (
    <div className="product-card__price">
      {hasDiscount && (
        <Typography variant="body1" className="product-card__price--active">
          ${price.discount}
        </Typography>
      )}
      <Typography
        variant="body1"
        className={
          hasDiscount
            ? "product-card__price--discount"
            : "product-card__price--active"
        }
      >
        ${price.regular}
      </Typography>
    </div>
  );

  const renderAffiliates = () => (
    <div className="product-affiliates">
      <Typography variant="body2" className="product-affiliates__title">
        Check latest price on:
      </Typography>
      {affiliates.map((affiliate) => (
        <Link
          key={affiliate.name}
          className="product-affiliates__button link"
          href={affiliate.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {affiliate.name}
        </Link>
      ))}
    </div>
  );

  return (
    <div className="product-card">
      <CustomImage
        className="product-card__image"
        src={image?.srcs.small || "/placeholder-image.jpg"}
        alt={image?.alt || name}
        sizes="(min-width: 1200px) 20vw, (min-width: 600px) 30vw, 45vw"
      />

      <Typography className="product-card__name" variant="h4" component="h2">
        {name}
      </Typography>
      {renderPrice()}
      {renderAffiliates()}
    </div>
  );
};

export default ProductCard;
