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
    <div className="shop-productCard--price">
      {hasDiscount && (
        <Typography
          variant="body1"
          className="shop-productCard--price-discount price-active"
        >
          ${price.discount}
        </Typography>
      )}
      <Typography
        variant="body1"
        className={`shop-productCard--price-regular ${
          hasDiscount ? "price-discount" : "price-active"
        }`}
      >
        ${price.regular}
      </Typography>
    </div>
  );

  const renderAffiliates = () => (
    <div className="shop-productCard--affiliates">
      <Typography
        variant="body2"
        className="shop-productCard--affiliates-title"
      >
        Check latest price on:
      </Typography>
      {affiliates.map((affiliate) => (
        <Link
          key={affiliate.name}
          className="shop-productCard--affiliates-btn link"
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
    <div className="shop-productCard">
      <CustomImage
        className="shop-productCard--image"
        src={image?.srcs.small || "/placeholder-image.jpg"}
        alt={image?.alt || name}
        sizes="(min-width: 1200px) 20vw, (min-width: 600px) 30vw, 45vw"
      />

      <Typography
        className="shop-productCard--name"
        variant="h4"
        component="h2"
      >
        {name}
      </Typography>
      {renderPrice()}
      {renderAffiliates()}
    </div>
  );
};

export default ProductCard;
